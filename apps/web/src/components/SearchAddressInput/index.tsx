import { useCallback, useEffect, useState } from 'react';
import Input from 'apps/web/src/components/Input';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { Address, isAddress } from 'viem';
import { useEnsAddress } from 'wagmi';
import { BaseName } from '@coinbase/onchainkit/identity';
import { isBasename } from 'apps/web/src/utils/usernames';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { truncateMiddle } from 'libs/base-ui/utils/string';
import Link from 'next/link';
import Hint from 'apps/web/src/components/Hint';
import Fieldset from 'apps/web/src/components/Fieldset';

type SearchAddressInputProps = {
  onChange: (value: string) => void;
};
export default function SearchAddressInput({ onChange }: SearchAddressInputProps) {
  const [value, setValue] = useState<string>('');

  /* 1. User enters an address */
  const valueIsAddress = isAddress(value);

  // Try to resolve on base
  const { data: basenameName, isLoading: basenameNameIsLoading } = useBaseEnsName({
    address: value as Address,
  });

  /* 2. User enters an Basename */
  const validBasename = isBasename(value);
  const { basenameChain } = useBasenameChain(value as BaseName);

  const { data: basenameAddress, isLoading: basenameAddressIsLoading } = useEnsAddress({
    name: value,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
    query: {
      enabled: validBasename,
      retry: false,
    },
  });

  /* 3. TODO: User enters a ENS name ? can we even do this cross-chain? */

  /* 4. Format and display a block explorer link accordingly */
  const showName = valueIsAddress && !!basenameName;
  const showAddress = validBasename && !!basenameAddress;
  const showValueAddress = valueIsAddress && !basenameAddress && !basenameName;

  const baseBlockExplorerUrl = basenameChain.blockExplorers?.default.url;
  const baseBlockExplorerName = basenameChain.blockExplorers?.default.name;

  const showExplorerLink =
    baseBlockExplorerUrl && baseBlockExplorerName && (showName || showAddress || showValueAddress);

  const finalAddress = basenameAddress ?? value;

  const explorerLink = `${baseBlockExplorerUrl}/address/${basenameAddress ?? value}`;

  const isLoading = basenameNameIsLoading || basenameAddressIsLoading;

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    onChange?.(finalAddress);
  }, [finalAddress, onChange, value]);

  return (
    <Fieldset className="w-full">
      <Input
        type="text"
        value={value}
        onChange={onInputChange}
        className="w-full flex-1 rounded-xl border border-gray-40/20 p-4 text-black"
        placeholder="Search by Basename or wallet address"
      />
      <p>
        {isLoading ? (
          <Icon name="spinner" color="currentColor" />
        ) : showExplorerLink ? (
          <Hint>
            <Link
              href={explorerLink}
              target="_blank"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              <p>
                View {showName && <strong>{basenameName}</strong>}
                {showAddress && <strong>{truncateMiddle(basenameAddress, 6, 4)}</strong>}
                {showValueAddress && <strong>{truncateMiddle(value, 6, 4)}</strong>} on{' '}
                {baseBlockExplorerName}
              </p>
              <Icon name="external-link" color="currentColor" height="0.8rem" width="0.8rem" />
            </Link>
          </Hint>
        ) : (
          <Hint>Enter a valid Basename or ETH address</Hint>
        )}
      </p>
    </Fieldset>
  );
}
