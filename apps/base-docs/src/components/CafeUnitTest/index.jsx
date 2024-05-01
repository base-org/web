/* eslint-disable */
import React from 'react';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBlockNumber,
} from 'wagmi';

import useNFTData from '../../utils/nft-exercise-data';
import { decodeEventLog } from 'viem';
import { CafeSocialShare } from '../CafeSocialShare';

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

export default function CafeUnitTest({ nftNum }) {
  const { isConnecting, isDisconnected, chain } = useAccount();
  const {
    data: testData,
    write: testContract,
    isPending: isTestLoading,
    error: isTestError,
    writeContract,
  } = useWriteContract();

  const [messages, setMessages] = useState(['Submit your contract address.']);
  const [contractFormEntry, setContractFormEntry] = useState('');
  const [submittedContract, setSubmittedContract] = useState('');
  const [hasPin, setHasPin] = useState(false);
  const [fetchNFTStatus, setFetchNFTStatus] = useState(true);

  const nftData = useNFTData();

  const nft = nftData[nftNum];

  const { data: hasNFT, refetch } = useReadContract({
    address: nft.deployment.address,
    abi: nft.deployment.abi,
    functionName: 'owners',
    args: [useAccount()?.address],
  });

  const { data: blockNumber } = useBlockNumber({ watch: fetchNFTStatus });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  useEffect(() => {
    setHasPin(!!hasNFT);
    setFetchNFTStatus(false);
  }, [hasNFT]);

  const { data: testReceiptData, isLoading: isTestReceiptLoading } = useWaitForTransactionReceipt({
    hash: testData,
  });

  function handleContractChange(event) {
    setContractFormEntry(event.target.value);
  }

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
      if (parsedLog.eventName === 'TestSuiteResult') {
        const { testResults } = parsedLog.args;
        // Results don't know which tests failed, so find them
        for (const testResult of testResults) {
          processed.push(`✅ ${testResult.message}`);
          const { assertResults } = testResult;
          const { elements: arList, num } = assertResults;
          // Slice out unused in array - arList is a dynamic memory array implementation
          // so it may have unused elements allocated
          const elements = arList.slice(0, Number(num));
          let passedAllAsserts = true;
          for (const element of elements) {
            if (!element.passed) {
              passedAllAsserts = false;
            }
          }
          if (!passedAllAsserts) {
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
    }

    if (testReceiptData) {
      for (const log of testReceiptData.logs) {
        try {
          const parsed = decodeEventLog({
            abi: nft.deployment.abi,
            data: log.data,
            topics: log.topics,
          });
          console.log('topics', parsed);
          processEventLog(parsed);
        } catch (e) {
          // Skip other log types (can't tell type without parsing)
          console.log('SKIPPED LOG', e);
        }
      }
    }
  }, [testReceiptData, contractFormEntry, nft.deployment.abi]);

  async function handleContractSubmit(event) {
    event.preventDefault();

    setSubmittedContract(contractFormEntry);
    setMessages(['Running tests...']);

    await writeContract({
      abi: nft.deployment.abi,
      address: nft.deployment.address,
      functionName: 'testContract',
      args: [contractFormEntry],
    });
  }

  function renderTests() {
    if (submittedContract) {
      const listItems = messages.map((message, index) => (
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
          <div style={pinTitleStyle}>
            {nft.title} NFT Badge Earned on {chain.name}!
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <p>Share your progress:</p>
            <CafeSocialShare name={nft.title} />
          </div>
          <br />
          <img src={nft.img} style={pinStyle} alt={`${nft.title} NFT Badge`} />
          <br />
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
            You can also use <a href="https://metamask.io/">MetaMask</a> and other popular wallets.
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
