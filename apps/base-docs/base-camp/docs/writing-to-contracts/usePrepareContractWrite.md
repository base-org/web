---
title: `usePrepareContractWrite`
description: Improve your user experience with the `usePrepareContractWrite` hook.
hide_table_of_contents: false
---

The [`usePrepareContractWrite`] hook "Eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate." What this means is that by using this hook, you can dramatically reduce the time it takes for the wallet confirmation to pop up for a transaction, and detect and respond to potential errors before the user tries to send a transaction.

---

## Objectives

By the end of this guide you should be able to:

- Implement Wagmi's `usePrepareContractWRite` and `useContractWrite` to send transactions to a smart contract
- Configure the options in `usePrepareContractWrite` and `useContractWrite`
- Call a smart contract function on-demand using the write function from `useContractWrite`, with arguments and a value

---

## Refining the Claim Component

In the previous step-by-step, you used [`useContractWrite`] to set up a hook you can use to to call the `claim` function in your smart contract when the user clicks a button. The component works well enough, but it can take a long time for the wallet to pop up, particularly if there is network congestion. You also have no way of responding to a problem with the transaction inputs until after the user tries to initiate a transaction.

### Using `usePrepareContractWrite`

The `usePrepareContractWrite` is use with `useContractWrite`, which accepts it as an argument. It has most of the same properties as well. Modify your `TokenInfo` component to test it:

```typescript
// Bad code for example.  See below for fix.
const { config: claimConfig, isLoading: claimIsLoading } = usePrepareContractWrite({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'claim',
  onSettled(error) {
    if (error) {
      alert('Unable to claim');
    }
  },
});
const { write: claim } = useContractWrite(claimConfig);
```

You'll also need to update your handler to use the TypeScript pre-check feature, because the claim function will be briefly `undefined`.

```typescript
const handleClaimClick = () => {
  claim?.();
};
```

Reload the site and observe that the `alert` is triggered on load if you're signed in with an address that has already claimed tokens. You'll also see that the button is disabled, as though the user had clicked it and a transaction is loading in the wallet.

### Making Adjustments

The reason for this is a subtle difference in how `useContractRead` and `usePrepareContractRead` work.

In the last step-by-step, you saw how viem runs a simulation of the transaction when the `write` function is called. `usePrepareContractRead` eagerly runs this simulation, updates status variables, and runs `onSettled` eagerly and proactively.

You'll need to make some modifications for it to work. You can go back to the instance of `isLoading` you decomposed from `useContractWrite` and it will work as before.

The `onSettled` function is now being triggered when the data for the call is _fetched_, not when the call has settled. As a result, it immediately generates the error, and triggers the `alert`.

You can solve this a number of ways, including simply not rendering the button if the user has already claimed. You could also modify the code, and combine it with `isError`, to share this information to the user.

```typescript
const { config: claimConfig, isError: claimIsError } = usePrepareContractWrite({
  address: contractData.address as `0x${string}`,
  abi: contractData.abi,
  functionName: 'claim',
});
const { write: claim, isLoading: claimIsLoading } = useContractWrite(claimConfig);

const handleClaimClick = () => {
  claim?.();
};

return (
  <div>
    <p>{'Token Balance: ' + tokenBalance}</p>
    <button disabled={claimIsLoading || claimIsError} onClick={handleClaimClick}>
      {claimIsLoading ? 'Complete In Wallet' : 'Claim Tokens'}
    </button>
    <p>{claimIsError ? 'Unable to claim tokens.' : 'Claim your tokens!'} </p>
  </div>
);
```

---

## Conclusion

In this step-by-step, you updated your app to use the `usePrepareContractWrite` hook to provide a speedier wallet interaction for your users. You've also learned how you can predict and respond to potential errors without the user needing to attempt to send a transaction. You could use this functionality to let them know a username is already taken, a bid amount is not large enough, or an item is no longer available.

---

[wagmi]: https://wagmi.sh/
[`useContractWrite`]: https://wagmi.sh/react/hooks/useContractWrite
[`usePrepareContractWrite`]: https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite
