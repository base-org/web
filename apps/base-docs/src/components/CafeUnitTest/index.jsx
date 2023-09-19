import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';

import nfts from '../../utils/nft-exercise-data';

const pinStyle = {
  width: 300,
  height: 300,
  marginRight: 10,
  marginBottom: '25px',
  display: 'block',
};

const pinTitleStyle = {
  marginTop: '25px',
  marginBottom: '10px',
  fontStyle: 'italic',
};

const buttonStyle = {
  fontSize: '16px',
  lineHeight: '1.75rem',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '24px',
  paddingRight: '24px',
  color: '#fff',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
};

const buttonEnabledColor = {
  backgroundColor: '#0051ff',
};

const buttonDisabledColor = {
  backgroundColor: '#d1d1d1',
};

const inputStyle = {
  padding: '14px',
  borderRadius: '6px',
  border: '1px solid lightGrey',
  fontSize: '14px',
  marginRight: '5px',
  width: '70%',
};

const messageStyle = {
  backgroundColor: '#d1ecf1',
  border: '1px #bee5eb',
  padding: '10px 5px 10px 20px',
  borderRadius: '6px',
  marginBottom: '5px',
};

const directionsStyle = {
  padding: '10px 0 10px 0',
};

export default function CafeUnitTest({ deployment, nftNum }) {
  const { isConnecting, isDisconnected } = useAccount();

  const [messages, setMessages] = useState(['Submit your contract address.']);
  const [contractFormEntry, setContractFormEntry] = useState('');
  const [submittedContract, setSubmittedContract] = useState('');
  const [hasPin, setHasPin] = useState(false);
  const nft = nfts[nftNum];

  const { data: hasNFT } = useContractRead({
    address: deployment.address,
    abi: deployment.abi,
    functionName: 'owners',
    args: [useAccount()?.address],
  });

  // Test Contract Function

  const {
    data: testData,
    write: testContract,
    isLoading: isTestLoading,
    error: isTestError,
    reset: resetTestContract,
  } = useContractWrite({
    address: deployment.address,
    abi: deployment.abi,
    functionName: 'testContract',
  });

  const { data: testReceiptData, isLoading: isTestReceiptLoading } = useWaitForTransaction({
    hash: testData?.hash,
  });

  function handleContractChange(event) {
    setContractFormEntry(event.target.value);
  }

  useEffect(() => {
    if (hasNFT != null) {
      setHasPin(hasNFT);
    }
  }, [hasNFT]);

  useEffect(() => {
    if (isTestError) {
      setMessages([
        'Something is wrong with the contract at the address you are trying to submit',
        'It is likely that your function signatures do not match what is expected.',
        'You will also see this if you cancel the transaction.',
      ]);
    }
  }, [isTestError]);

  useEffect(() => {
    async function processEventLog(parsedLog) {
      const processed = [];
      if (parsedLog.eventFragment.name === 'TestSuiteResult') {
        const { testResults } = parsedLog.args;
        // Results don't know which tests failed, so find them
        for (const testResult of testResults) {
          processed.push(`✅ ${testResult.message}`);
          const { assertResults } = testResult;
          const { elements: arList, num } = assertResults;
          // Slice out unused in array - arList is a dynamic memory array implementation
          // so it may have unused elements allocated
          const elements = arList.slice(0, num);
          let passed = true;
          for (const element of elements) {
            if (!element[0]) {
              passed = false;
            }
          }
          if (!passed) {
            processed[processed.length - 1] = `❌${processed[processed.length - 1].slice(1)}`;
            for (const element of elements) {
              if (element.passed === false) {
                try {
                  processed.push(`-> ${element.assertionError}`);
                } catch {
                  // An error in the assert smart contract sometimes sends strings
                  // with bytes that can't be converted to utf-8
                  // It can't be fixed here because the error is caused within iface.parseLog(log)
                  // See: https://github.com/ethers-io/ethers.js/issues/714

                  processed.push('-> Assertion failed (cannot parse message)');
                }
              }
            }
          }
        }
      }

      setMessages([...processed]);
      resetTestContract();
    }

    if (testReceiptData) {
      for (const log of testReceiptData.logs) {
        try {
          const iface = new ethers.utils.Interface(deployment.abi);
          const parsed = iface.parseLog(log);
          processEventLog(parsed);
        } catch (e) {
          // Skip other log types (can't tell type without parsing)
        }
      }
    }
  }, [testReceiptData, contractFormEntry, deployment.abi, resetTestContract]);

  async function handleContractSubmit(event) {
    event.preventDefault();

    setSubmittedContract(contractFormEntry);
    setMessages(['Running tests...']);

    await testContract({ args: [contractFormEntry] });
  }

  function renderTests() {
    if (submittedContract) {
      const listItems = messages.map((message, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="alert-message" style={messageStyle} key={index}>
          {message}
        </div>
      ));
      return <div>{listItems}</div>;
    }
    return <div />;
  }

  function renderResult() {
    if (hasPin) {
      return (
        <div>
          <div style={pinTitleStyle}>{nft.title} NFT Badge Earned!</div>
          <img src={nft.img} style={pinStyle} alt={`${nft.title} NFT Badge`} />
        </div>
      );
    }
    return <div style={directionsStyle}>Submit your passing contract to earn this badge.</div>;
  }

  function renderTestSubmission() {
    if (isDisconnected) {
      return (
        <div>
          <ConnectButton />
          <div>Please connect your wallet.</div>
          <div>
            If you need a wallet, you can get the{' '}
            <a href="https://www.coinbase.com/wallet">Coinbase Wallet here</a>.
          </div>
          <div>
            You can also use <a href="https://metamask.io/">Metamask</a> and other popular wallets.
          </div>
        </div>
      );
    }
    if (isConnecting) {
      return <div>Connecting...</div>;
    }
    return (
      <div>
        <hr />
        <ConnectButton />
        <br />
        <div>{renderTests()}</div>
        <div>{renderResult()}</div>
        <div>
          <form>
            <label htmlFor="submissionAddressField">
              <input
                placeholder="Contract address"
                style={inputStyle}
                type="text"
                id="submissionAddressField"
                value={contractFormEntry}
                onChange={handleContractChange}
              />
            </label>
            <button
              disabled={isTestLoading || isTestReceiptLoading}
              style={{
                ...buttonStyle,
                ...(isTestLoading || isTestReceiptLoading
                  ? buttonDisabledColor
                  : buttonEnabledColor),
              }}
              type="button"
              onClick={handleContractSubmit}
            >
              {isTestLoading || isTestReceiptLoading ? 'Testing' : 'Submit'}
            </button>
          </form>
        </div>
        <br />
      </div>
    );
  }

  return <div>{renderTestSubmission()}</div>;
}
