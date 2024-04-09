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

export const CustomConnectButton = () => {
  return (
    <ConnectButton />
    // <ConnectButton.Custom>
    //   {({
    //     account,
    //     chain,
    //     openAccountModal,
    //     openChainModal,
    //     openConnectModal,
    //     authenticationStatus,
    //     mounted,
    //   }) => {
    //     const ready = mounted && authenticationStatus !== 'loading';
    //     const connected =
    //       ready &&
    //       account &&
    //       chain &&
    //       (!authenticationStatus || authenticationStatus === 'authenticated');

    //     return (
    //       <div
    //         {...(!ready && {
    //           'aria-hidden': true,
    //           style: {
    //             opacity: 0,
    //             pointerEvents: 'none',
    //             userSelect: 'none',
    //           },
    //         })}
    //       >
    //         {(() => {
    //           if (!connected) {
    //             return (
    //               <button onClick={openConnectModal} type="button">
    //                 Connect Wallet
    //               </button>
    //             );
    //           }

    //           if (chain.unsupported) {
    //             return (
    //               <button onClick={openChainModal} type="button">
    //                 Wrong network
    //               </button>
    //             );
    //           }

    //           return (
    //             <div style={{ display: 'flex', gap: 12 }}>
    //               <button
    //                 onClick={openChainModal}
    //                 style={{ display: 'flex', alignItems: 'center' }}
    //                 type="button"
    //               >
    //                 {chain.hasIcon && (
    //                   <div
    //                     style={{
    //                       background: chain.iconBackground,
    //                       width: 12,
    //                       height: 12,
    //                       borderRadius: 999,
    //                       overflow: 'hidden',
    //                       marginRight: 4,
    //                     }}
    //                   >
    //                     {chain.iconUrl && (
    //                       <img
    //                         alt={chain.name ?? 'Chain icon'}
    //                         src={chain.iconUrl}
    //                         style={{ width: 12, height: 12 }}
    //                       />
    //                     )}
    //                   </div>
    //                 )}
    //                 {chain.name}
    //               </button>

    //               <button onClick={openAccountModal} type="button">
    //                 {account.displayName}
    //                 {account.displayBalance ? ` (${account.displayBalance})` : ''}
    //               </button>
    //             </div>
    //           );
    //         })()}
    //       </div>
    //     );
    //   }}
    // </ConnectButton.Custom>
  );
};

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
};
export default ComponentTypes;
