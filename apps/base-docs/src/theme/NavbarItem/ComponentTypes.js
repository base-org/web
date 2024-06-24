import React, { useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';

import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import LocaleDropdownNavbarItem from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import SearchNavbarItem from '@theme/NavbarItem/SearchNavbarItem';
import HtmlNavbarItem from '@theme/NavbarItem/HtmlNavbarItem';
import DocNavbarItem from '@theme/NavbarItem/DocNavbarItem';
import DocSidebarNavbarItem from '@theme/NavbarItem/DocSidebarNavbarItem';
import DocsVersionNavbarItem from '@theme/NavbarItem/DocsVersionNavbarItem';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import styles from './styles.module.css';
import { WalletAvatar } from '../../components/WalletAvatar';
import logEvent, { logEventAndSend, identify } from "base-ui/utils/logEvent";

export const CustomConnectButton = ({ className }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        const { address } = useAccount();

        useEffect(() => {
          if (address) {
            logEvent('ConnectWalletButton_WalletConnected', { address });
            identify({ userId: address });
          }
        }, [address]);

        const clickConnect = useCallback(() => {
          openConnectModal?.();
          logEvent('ConnectWalletButton_Selected', {});
        }, [openConnectModal]);

        return (
          <div
            className={className}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className={styles.connectButton} onClick={clickConnect} type="button">
                    Connect
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className={styles.errorButton} onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxHeight: '36px' }}>
                  <div
                    className={styles.networkContainer}
                    style={{ display: 'flex', alignItems: 'center', maxHeight: '36px' }}
                  >
                    <button
                      className={styles.network}
                      onClick={openChainModal}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '36px',
                        minHeight: '36px',
                      }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                          }}
                        >
                          {chain.iconUrl && (
                            <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} />
                          )}
                        </div>
                      )}
                    </button>
                  </div>
                  <div
                    className={styles.identityContainer}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, maxHeight: '36px' }}
                  >
                    <button className={styles.identity} onClick={openAccountModal} type="button">
                      {account && (
                        <div className={styles.avatar}>
                          <WalletAvatar
                            address={account.address}
                            ensImage={account.ensAvatar}
                            size={24}
                          />
                        </div>
                      )}
                      {account.ensName ?? account.displayName}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export const CustomNavbarLink = (props) => {
  return (
    <a
      href={props.to}
      target={props.target ?? '_self'}
      className='navbar__item navbar__link'
      style={{ cursor: 'pointer'}}
      onClick={() => {
        logEventAndSend(props.eventLabel, props.eventDetail ?? {})
      }}
    >
      {props.label}
    </a>
  )
}

export const CustomDropdownLink = (props) => {
  return (
    <li>
      <a
        href={props.to}
        target={props.target ?? '_self'}
        className='dropdown__link'
        style={{ cursor: 'pointer'}}
        onClick={() => {
          logEventAndSend(props.eventLabel, props.eventDetail ?? {})
        }}
      >
        {props.label}
      </a>
    </li>
  )
}

const ComponentTypes = {
  default: DefaultNavbarItem,
  localeDropdown: LocaleDropdownNavbarItem,
  search: SearchNavbarItem,
  dropdown: DropdownNavbarItem,
  html: HtmlNavbarItem,
  doc: DocNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  docsVersionDropdown: DocsVersionDropdownNavbarItem,
  'custom-connectWallet': CustomConnectButton,
  'custom-navbarLink': CustomNavbarLink,
  'custom-dropdownLink': CustomDropdownLink,
};
export default ComponentTypes;
