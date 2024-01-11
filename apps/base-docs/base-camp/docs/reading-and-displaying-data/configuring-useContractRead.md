---
title: Configuring `useContractRead`
description: Configure the properties of the `useContractRead` hook.
hide_table_of_contents: false
---

The [`useContractRead`] hook has a number of configurable properties that will allow you to adapt it to your needs. You can [`watch`], for updates, though not for free. Once those updates are retrieved you can use the hook to automatically run an update function to set state for React, or handle any other logic you want to trigger when the data on the blockchain changes.

---

## Objectives

By the end of this guide you should be able to:

- Enable the `watch` feature of `useContractRead` to automatically fetch updates from the blockchain
- Describe the costs of using the `watch` feature, and methods to reduce those costs
- Configure arguments to be passed with a call to a `pure` or `view` smart contract function
- Call an instance of `useContractRead` on demand
- Utilize `isLoading` and `isFetching` to improve user experience

---

## Fetching Updates from the Blockchain

We'll continue with the project you've been building and last updated while learning about the [`useContractRead` hook].

Once the excitement of your accomplishment of finally reading from your own contract subsides, try using BaseScan to add another issue, or vote on an existing issue. You'll notice that your frontend does **not** update. There are a few ways to handle this.

### The Watch Feature

The easiest, is to turn on the [`watch`] feature. Update your hook to set it to `true`:

```typescript
const { isError: issuesIsError, isLoading: issuesIsLoading } = useContractRead({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'getAllIssues',
  watch: true,
  onSettled(data, error) {
    if (data) {
      const issuesList = data as Issue[];
      // console.log(issuesList);
      setIssues(issuesList);
    }
  },
});
```

Try adding a new issue and it will automatically appear on the list, although it may take more time than you are used to. Blockchain is still slower than the web.

It works! Unfortunately, you can't really stop here, unless you're working on a hackathon prototype or a very early stage demo. The catch is that `wagmi` has a default [`pollingInterval`] of 4 seconds, so having this `watch` causes it to call `eth_blocknumber` and `eth_call`, to call your `getAllIssuesFunction` over and over and over again.

If you were to take the obvious approach of adding a `useContractRead` for every function you wanted data from, and set it to `watch`, things would quickly get out of hand. A single open web page with 15 functions watched in this way will hit rate limiting in as short as an hour.

:::info

Don't do this, either use multicall via [`useContractReads`], or consolidate your `view`s into a single function that fetches all the data you need in one call.

:::

Luckily, you have options to control these calls a little better.

### Pausing On Blur

Once quick improvement is to simply stop watching the blockchain if the website doesn't have focus. To see this in action, add a state variable to count how many times the function has settled, and one for if the page is focused. You'll also need to set up event listeners to set the state of the latter when the page is focused or blurred.

```typescript
const [timesCalled, setTimesCalled] = useState(0);
const [pageIsFocused, setPageIsFocused] = useState(false);

useEffect(() => {
  const onFocus = () => setPageIsFocused(true);
  const onBlur = () => setPageIsFocused(false);

  window.addEventListener('focus', onFocus);
  window.addEventListener('blur', onBlur);

  return () => {
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('blur', onBlur);
  };
}, []);
```

Then, set `watch` to `pageIsFocused`, and increment your counter in `onSettled`

```typescript
const { isError: issuesIsError, isLoading: issuesIsLoading } = useContractRead({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'getAllIssues',
  watch: pageIsFocused,
  onSettled(data, error) {
    if (data) {
      const issuesList = data as Issue[];
      setIssues(issuesList);

      setTimesCalled(timesCalled + 1);
    }
  },
});
```

Finally, surface your counter in the component.

```typescript
return (
  <div>
    <h2>Number of times called</h2>
    <p>{timesCalled.toString()}</p>
    <p>{'Has focus: ' + pageIsFocused}</p>
    <h2>All Issues</h2>
    <div>{renderIssues()}</div>
  </div>
);
```

Now, when you watch the page, the count will go up every four seconds. When you switch to another tab or window, the counter will pause until you switch back.

### Adjusting the Polling Rate

You likely need to share timely updates with your users, but how timely do those updates need to be to meet the requirements of your app? If you're doing instant messaging, 4 seconds may even be too long (though any faster is running into the speed blocks are added in most L2s).

A more robust DAO is going to have a voting period of at least a day or two, so those users probably don't need to see that there is a new issue within 4 seconds of it hitting the chain.

Adjust your [`pollingInterval`] by setting it in `configureChains` in `_app.tsx`:

```typescript
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseSepolia],
  [
    // other providers...
    publicProvider(),
  ],
  { pollingInterval: 30_000 },
);
```

Setting it to 30 seconds, or 30,000 milliseconds, will reduce your API calls dramatically, without negatively impacting members of the DAO.

### Updating on Demand

You can use a similar system to call your update function on demand. First, add a button, a handler for that button, and a state variable for it to set:

```typescript
const [triggerRead, setTriggerRead] = useState(false);

const handleTriggerRead = () => {
  setTriggerRead(true);
};
```

```typescript
return (
  <div>
    <button onClick={handleTriggerRead}>Read Now</button>
    <h2>Number of times called</h2>
    <p>{timesCalled.toString()}</p>
    <p>{'Has focus: ' + pageIsFocused}</p>
    <h2>All Issues</h2>
    <div>{renderIssues()}</div>
  </div>
);
```

Finally, set `watch` to equal `triggerRead`, instead of `pageIsFocused`, and reset `triggerRead` in `onSettled`.

```typescript
const { isError: issuesIsError, isLoading: issuesIsLoading } = useContractRead({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'getAllIssues',
  watch: triggerRead,
  onSettled(data, error) {
    if (data) {
      const issuesList = data as Issue[];
      setIssues(issuesList);

      setTimesCalled(timesCalled + 1);
      setTriggerRead(false);
    }
  },
});
```

Now, when the user clicks the button, the hook will call the read function a single time, then set `watch` back to false.

---

## Setting UI Elements

You can use the "is" return values to set UI elements depending on the status of the hook as it attempts to call a function on the blockchain.

```typescript
// Wagmi useContractRead return values
{
  data?: Result
  error?: Error
  isIdle: boolean
  isLoading: boolean
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  isFetched: boolean
  isFetchedAfterMount: boolean
  isRefetching: boolean
  refetch: (options: {
    throwOnError: boolean
    cancelRefetch: boolean
  }) => Promise<Result>
  status: 'idle' | 'error' | 'loading' | 'success'
}
```

Try to modify your button to provide feedback to the user that the function has been called.

```typescript
// Bad code example, do not use
<button disabled={issuesIsLoading} onClick={handleTriggerRead}>
  {issuesIsLoading ? 'Loading' : 'Read Now'}
</button>
```

The above code won't break anything, but nothing will appear to happen. This happens because `isLoading` is only `true` in circumstances where data is loading for the first time, but no data is present. You could use this to show a spinning wheel in place of the list of issues.

Instead, try decomposing `isFetching` in your `useContractRead`. This property is true while data is being fetched, even if data has already been loaded once.

```typescript
// Imperfect code example, do not use
<button disabled={issuesIsFetching} onClick={handleTriggerRead}>
  {issuesIsFetching ? 'Loading' : 'Read Now'}
</button>
```

You'll probably see the button flicker very quickly since the call doesn't take very long. For a production app, you'd need to add additional handling to smooth out the experience.

---

## Passing Arguments

Arguments are passed into a `useContractRead` hook by adding an array of arguments, in order, to the `args` property. Common practice is to use React state variables set by UI elements to enable the arguments to be set and modified. For example, you might create a drop-down to set `issueNumber`, then fetch that issue with:

```typescript
// Incomplete code stub
const [issueNumber, setIssueNumber] = useState(0);

const { isError: getIssueIsError, isLoading: getIssueIsLoading } = useContractRead({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'getIssue',
  args: [issueNumber],
  enabled: issueNumber != 0,
  watch: getIssueTriggered,
  onSettled(data, error) {
    // Set state...
    // Reset triggers
  },
});
```

Here, we've set the `enabled` flag to be `false` until an id is selected, which will prevent the hook from running with a bad `issueNumber` and generating an error. We've also mocked out a similar system as above to turn `watch` on and off, perhaps in the handler for selecting the `issueNumber`.

---

## Conclusion

In this guide, you've learned how to use the `watch` feature of `useContractRead` to enable your frontend to see updates to your smart contract. You've also learned the costs of doing so, and some strategies for mitigation. You've learned how to pass arguments to your functions. Finally, you've learned how to use the properties returned by `useContractRead` to adjust your UI to improve the experience for your users.

---

[wagmi]: https://wagmi.sh/
[`useContractRead`]: https://wagmi.sh/react/hooks/useContractRead
[`useContractRead` hook]: ./useContractRead
[`watch`]: https://wagmi.sh/react/hooks/useContractRead#watch-optional
[`pollingInterval`]: https://wagmi.sh/core/providers/configuring-chains#pollinginterval-optional
[`useContractReads`]: https://wagmi.sh/react/hooks/useContractReads
