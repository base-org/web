// vocs.config.tsx
import { defineConfig } from "file:///Users/brendan_cb/dev/opensource/base/web/apps/base-docs/node_modules/vocs/_lib/index.js";

// sidebar.ts
var sidebar = [
  {
    text: "Overview",
    link: "/"
  },
  {
    text: "Quickstart",
    link: "/quickstart"
  },
  {
    text: "Builder Kits",
    items: [
      {
        text: "OnchainKit",
        collapsed: true,
        items: [
          {
            text: "Introduction",
            items: [{ text: "Getting Started", link: "/builderkits/onchainkit/getting-started" }]
          },
          {
            text: "Installation",
            items: [
              { text: "Next.js", link: "/builderkits/onchainkit/installation/nextjs" },
              { text: "Vite", link: "/builderkits/onchainkit/installation/vite" },
              { text: "Remix", link: "/builderkits/onchainkit/installation/remix" },
              { text: "Astro", link: "/builderkits/onchainkit/installation/astro" }
            ]
          },
          {
            text: "Config",
            items: [
              {
                text: "OnchainKitProvider",
                link: "/builderkits/onchainkit/config/onchainkit-provider"
              }
            ]
          },
          {
            text: "Contribution",
            items: [
              {
                text: "How to Contribute",
                link: "/builderkits/onchainkit/guides/contribution"
              },
              {
                text: "Report a Bug",
                link: "/builderkits/onchainkit/guides/reporting-bug"
              }
            ]
          },
          {
            text: "Guides",
            items: [
              {
                text: "Lifecycle Status",
                link: "/builderkits/onchainkit/guides/lifecycle-status"
              },
              {
                text: "Tailwind CSS Integration",
                link: "/builderkits/onchainkit/guides/tailwind"
              },
              {
                text: "Theme Customization",
                link: "/builderkits/onchainkit/guides/themes"
              },
              {
                text: "Use Basename",
                link: "/builderkits/onchainkit/guides/use-basename-in-onchain-app"
              }
            ]
          },
          {
            text: "Templates",
            items: [
              {
                text: "Onchain NFT App \u2197",
                link: "https://ock-mint.vercel.app/"
              },
              {
                text: "Onchain Commerce App \u2197",
                link: "https://onchain-commerce-template.vercel.app/"
              },
              {
                text: "Onchain Social Profile \u2197",
                link: "https://github.com/fakepixels/ock-identity"
              }
            ]
          },
          {
            text: "Components",
            items: [
              {
                text: "Checkout",
                items: [
                  {
                    text: "Checkout",
                    link: "/builderkits/onchainkit/checkout/checkout"
                  }
                ]
              },
              {
                text: "Frame",
                items: [
                  {
                    text: "FrameMetadata",
                    link: "/builderkits/onchainkit/frame/frame-metadata"
                  }
                ]
              },
              {
                text: "Fund",
                items: [
                  {
                    text: "FundButton",
                    link: "/builderkits/onchainkit/fund/fund-button"
                  }
                ]
              },
              {
                text: "Identity",
                items: [
                  {
                    text: "Identity",
                    link: "/builderkits/onchainkit/identity/identity"
                  },
                  {
                    text: "Address",
                    link: "/builderkits/onchainkit/identity/address"
                  },
                  {
                    text: "Avatar",
                    link: "/builderkits/onchainkit/identity/avatar"
                  },
                  {
                    text: "Badge",
                    link: "/builderkits/onchainkit/identity/badge"
                  },
                  {
                    text: "IdentityCard",
                    link: "/builderkits/onchainkit/identity/identity-card"
                  },
                  {
                    text: "Name",
                    link: "/builderkits/onchainkit/identity/name"
                  },
                  {
                    text: "Socials",
                    link: "/builderkits/onchainkit/identity/socials"
                  }
                ]
              },
              {
                text: "Mint",
                items: [
                  {
                    text: "NFTCard",
                    link: "/builderkits/onchainkit/mint/nft-card"
                  },
                  {
                    text: "NFTMintCard",
                    link: "/builderkits/onchainkit/mint/nft-mint-card"
                  }
                ]
              },
              {
                text: "Swap",
                items: [
                  {
                    text: "Swap",
                    link: "/builderkits/onchainkit/swap/swap"
                  },
                  {
                    text: "SwapSettings",
                    link: "/builderkits/onchainkit/swap/swap-settings"
                  }
                ]
              },
              {
                text: "Token",
                items: [
                  {
                    text: "TokenChip",
                    link: "/builderkits/onchainkit/token/token-chip"
                  },
                  {
                    text: "TokenImage",
                    link: "/builderkits/onchainkit/token/token-image"
                  },
                  {
                    text: "TokenRow",
                    link: "/builderkits/onchainkit/token/token-row"
                  },
                  {
                    text: "TokenSearch",
                    link: "/builderkits/onchainkit/token/token-search"
                  },
                  {
                    text: "TokenSelectDropdown",
                    link: "/builderkits/onchainkit/token/token-select-dropdown"
                  }
                ]
              },
              {
                text: "Transaction",
                items: [
                  {
                    text: "Transaction",
                    link: "/builderkits/onchainkit/transaction/transaction"
                  }
                ]
              },
              {
                text: "Wallet",
                items: [
                  {
                    text: "Wallet",
                    link: "/builderkits/onchainkit/wallet/wallet"
                  },
                  {
                    text: "WalletDropdownBasename",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-basename"
                  },
                  {
                    text: "WalletDropdownDisconnect",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-disconnect"
                  },
                  {
                    text: "WalletDropdownFundLink",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-fund-link"
                  },
                  {
                    text: "WalletDropdownLink",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-link"
                  }
                ]
              }
            ]
          },
          {
            text: "API",
            items: [
              {
                text: "Mint",
                items: [
                  {
                    text: "getTokenDetails",
                    link: "/builderkits/onchainkit/api/get-token-details"
                  },
                  {
                    text: "getMintDetails",
                    link: "/builderkits/onchainkit/api/get-mint-details"
                  },
                  {
                    text: "buildMintTransaction",
                    link: "/builderkits/onchainkit/api/build-mint-transaction"
                  }
                ]
              },
              {
                text: "Swap",
                items: [
                  {
                    text: "buildSwapTransaction",
                    link: "/builderkits/onchainkit/api/build-swap-transaction"
                  },
                  {
                    text: "getSwapQuote",
                    link: "/builderkits/onchainkit/api/get-swap-quote"
                  }
                ]
              },
              {
                text: "Token",
                items: [
                  {
                    text: "getTokens",
                    link: "/docs/kits/onchainkit/api/get-tokens"
                  }
                ]
              }
            ]
          },
          {
            text: "Utilities",
            collapsed: true,
            items: [
              {
                text: "Config",
                items: [
                  {
                    text: "isBase",
                    link: "/docs/kits/onchainkit/config/is-base"
                  },
                  {
                    text: "isEthereum",
                    link: "/docs/kits/onchainkit/config/is-ethereum"
                  }
                ]
              },
              {
                text: "Fund",
                items: [
                  {
                    text: "getOnrampBuyUrl",
                    link: "/docs/kits/onchainkit/fund/get-onramp-buy-url"
                  }
                ]
              },
              {
                text: "Frame",
                items: [
                  {
                    text: "getFarcasterUserAddress",
                    link: "/docs/kits/onchainkit/farcaster/get-farcaster-user-address"
                  },
                  {
                    text: "getFrameHtmlResponse",
                    link: "/docs/kits/onchainkit/frame/get-frame-html-response"
                  },
                  {
                    text: "getFrameMessage",
                    link: "/docs/kits/onchainkit/frame/get-frame-message"
                  },
                  {
                    text: "getFrameMetadata",
                    link: "/docs/kits/onchainkit/frame/get-frame-metadata"
                  },
                  {
                    text: "getXmtpFrameMessage",
                    link: "/docs/kits/onchainkit/xmtp/get-xmtp-frame-message"
                  },
                  {
                    text: "isXmtpFrameRequest",
                    link: "/docs/kits/onchainkit/xmtp/is-xmtp-frame-request"
                  }
                ]
              },
              {
                text: "Identity",
                items: [
                  {
                    text: "getAddress",
                    link: "/docs/kits/onchainkit/identity/get-address"
                  },
                  {
                    text: "getAttestations",
                    link: "/docs/kits/onchainkit/identity/get-attestations"
                  },
                  {
                    text: "getAvatar",
                    link: "/docs/kits/onchainkit/identity/get-avatar"
                  },
                  {
                    text: "getName",
                    link: "/docs/kits/onchainkit/identity/get-name"
                  },
                  {
                    text: "useAddress",
                    link: "/docs/kits/onchainkit/identity/use-address"
                  },
                  {
                    text: "useAvatar",
                    link: "/docs/kits/onchainkit/identity/use-avatar"
                  },
                  {
                    text: "useName",
                    link: "/docs/kits/onchainkit/identity/use-name"
                  }
                ]
              },
              {
                text: "Token",
                items: [
                  {
                    text: "formatAmount",
                    link: "/docs/kits/onchainkit/token/format-amount"
                  }
                ]
              },
              {
                text: "Wallet",
                items: [
                  {
                    text: "isValidAAEntrypoint",
                    link: "/docs/kits/onchainkit/wallet/is-valid-aa-entrypoint"
                  },
                  {
                    text: "isWalletACoinbaseSmartWallet",
                    link: "/docs/kits/onchainkit/wallet/is-wallet-a-coinbase-smart-wallet"
                  }
                ]
              }
            ]
          },
          {
            text: "Types",
            collapsed: true,
            items: [
              {
                text: "API",
                link: "/docs/kits/onchainkit/api/types"
              },
              {
                text: "Checkout",
                link: "/docs/kits/onchainkit/checkout/types"
              },
              {
                text: "Config",
                link: "/docs/kits/onchainkit/config/types"
              },
              {
                text: "Farcaster",
                link: "/docs/kits/onchainkit/farcaster/types"
              },
              {
                text: "Fund",
                link: "/docs/kits/onchainkit/fund/types"
              },
              {
                text: "Frame",
                link: "/docs/kits/onchainkit/frame/types"
              },
              {
                text: "Identity",
                link: "/docs/kits/onchainkit/identity/types"
              },
              {
                text: "Mint",
                link: "/docs/kits/onchainkit/mint/types"
              },
              {
                text: "Swap",
                link: "/docs/kits/onchainkit/swap/types"
              },
              {
                text: "Token",
                link: "/docs/kits/onchainkit/token/types"
              },
              {
                text: "Transaction",
                link: "/docs/kits/onchainkit/transaction/types"
              },
              {
                text: "Wallet",
                link: "/docs/kits/onchainkit/wallet/types"
              }
            ]
          }
        ]
      },
      {
        text: "AgentKit \u2197",
        link: "https://docs.cdp.coinbase.com/agentkit/docs/welcome"
      }
    ]
  },
  {
    text: "Blockspace Tools",
    items: [
      {
        text: "Paymaster \u2197",
        link: "https://docs.cdp.coinbase.com/paymaster/docs/welcome"
      }
      // { PENDING APPCHAIN RELEASE 2/25
      //   text: 'Appchains ↗',
      //   link: 'https://docs.cdp.coinbase.com/paymaster/docs/welcome',
      // },
    ]
  },
  {
    text: "Identity",
    items: [
      {
        text: "Smart Wallet",
        collapsed: true,
        items: [
          {
            text: "Introduction",
            items: [
              { text: "Install for Web", link: "identity/smart-wallet/install-web" },
              { text: "Install for React Native", link: "identity/smart-wallet/install-react-native" },
              { text: "Recommend Libraries", link: "identity/smart-wallet/recommended-libraries" },
              { text: "Starter Templates", link: "identity/smart-wallet/starter-templates" }
            ]
          },
          {
            text: "Features",
            items: [
              {
                text: "Built-in Features",
                items: [
                  { text: "Single Sign On", link: "identity/smart-wallet/features/single-sign-on" },
                  { text: "Networks", link: "identity/smart-wallet/features/networks" },
                  { text: "Passkeys", link: "identity/smart-wallet/features/passkeys" },
                  { text: "Recovery", link: "identity/smart-wallet/features/recovery-keys" },
                  { text: "MagicSpend", link: "identity/smart-wallet/features/magic-spend" }
                ]
              },
              {
                text: "Optional Features",
                items: [
                  { text: "Gas-free Transactions", link: "identity/smart-wallet/features/sponsored-transactions" },
                  { text: "One-click Transactions", link: "identity/smart-wallet/features/spend-permissions" },
                  { text: "Batch Transactions", link: "identity/smart-wallet/features/batch-operations" },
                  { text: "Custom Gas Tokens", link: "identity/smart-wallet/features/custom-gas-tokens" }
                ]
              }
            ]
          },
          {
            text: "Important Details",
            items: [
              { text: "Signature Verification", link: "identity/smart-wallet/important-details/signature-verification" },
              { text: "Popups", link: "identity/smart-wallet/important-details/popups" },
              { text: "Simulations", link: "identity/smart-wallet/important-details/simulations" },
              { text: "Portability", link: "identity/smart-wallet/important-details/portability" },
              { text: "Gas Usage", link: "identity/smart-wallet/important-details/gas-usage" },
              { text: "Self Calls", link: "identity/smart-wallet/important-details/self-calls" }
            ]
          },
          {
            text: "SDK",
            collapsed: false,
            items: [
              {
                text: "createCoinbaseWalletSDK",
                link: "identity/smart-wallet/sdk/create-coinbase-wallet-sdk"
              }
            ]
          },
          {
            text: "Tutorials",
            collapsed: true,
            items: [
              {
                text: "Create a New Web App",
                items: [
                  { text: "Using Onchain App Template", link: "/identity/smart-wallet/guides/create-app/using-onchain-app-template" },
                  { text: "Using Wagmi", link: "/identity/smart-wallet/guides/create-app/using-wagmi" }
                ]
              },
              { text: "Update Existing App", link: "/identity/smart-wallet/guides/update-existing-app" },
              { text: "React Native Integration", link: "/identity/smart-wallet/guides/react-native-integration" },
              { text: "Create Wallet Button", link: "/identity/smart-wallet/guides/components/create-wallet-button" },
              { text: "Signature Verification", link: "/identity/smart-wallet/guides/signature-verification" },
              { text: "SIWE", link: "/identity/smart-wallet/guides/siwe" },
              { text: "Batch Transactions", link: "/identity/smart-wallet/guides/batch-transactions" },
              {
                text: "Spend Permissions",
                items: [
                  { text: "Overview", link: "/identity/smart-wallet/guides/spend-permissions/overview" },
                  { text: "Quick Start", link: "/identity/smart-wallet/guides/spend-permissions/quick-start" },
                  {
                    text: "API Reference",
                    items: [
                      { text: "Client Resources", link: "/identity/smart-wallet/guides/spend-permissions/api-reference/client-resources" },
                      { text: "SpendPermissionManager", link: "/identity/smart-wallet/guides/spend-permissions/api-reference/spendpermissionmanager" },
                      { text: "Wallet FetchPermissions", link: "/identity/smart-wallet/guides/spend-permissions/api-reference/wallet-fetchpermissions" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "Basenames",
        collapsed: true,
        items: [
          {
            text: "Tutorials",
            items: [
              { text: "Basenames Wagmi Tutorial", link: "/identity/basenames/basenames-wagmi-tutorial" },
              { text: "Basenames OnchainKit Tutorial", link: "/identity/basenames/basenames-onchainkit-tutorial" }
            ]
          },
          {
            text: "FAQ & Troubleshooting",
            items: [
              { text: "Basenames FAQ", link: "/identity/basenames/basenames-faq" }
            ]
          }
        ]
      },
      {
        text: "Verifications",
        collapsed: true,
        items: [
          {
            text: "Quickstart",
            items: [
              { text: "Quickstart", link: "/identity/verifications/quickstart" }
            ]
          },
          {
            text: "Introduction",
            items: [
              { text: "Welcome", link: "/identity/verifications/welcome" },
              { text: "Use Cases", link: "/identity/verifications/use-cases" }
            ]
          },
          {
            text: "Documentation",
            items: [
              { text: "Attestations", link: "/identity/verifications/attestations" }
            ]
          },
          { text: "FAQ & Troubleshooting", link: "/identity/verifications/faq-troubleshooting" },
          {
            text: "Support",
            items: [
              { text: "Discord Community", link: "/identity/verifications/verifications-discord" }
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Chain",
    items: [
      {
        text: "General",
        collapsed: true,
        items: [
          { text: "Deploy on Base", link: "/chain/deploy-on-base-quickstart" },
          { text: "Network Information", link: "/chain/network-information" },
          { text: "Fees", link: "/chain/fees" },
          { text: "Differences Between Ethereum and Base", link: "/chain/differences-between-ethereum-and-base" },
          { text: "Run a Base Node", link: "/chain/run-a-base-node" },
          { text: "Bridge an L1 Token to Base", link: "/chain/bridge-an-l1-token-to-base" }
        ]
      },
      {
        text: "Contracts",
        collapsed: true,
        items: [
          { text: "Base Contracts", link: "/chain/base-contracts" }
        ]
      },
      {
        text: "Security",
        collapsed: true,
        items: [
          { text: "Security", link: "/chain/security" }
        ]
      },
      {
        text: "OP Stack",
        collapsed: true,
        items: [
          { text: "Decentralizing Base with Optimism", link: "/chain/decentralizing-base-with-optimism" }
        ]
      },
      {
        text: "Tools",
        collapsed: true,
        items: [
          { text: "Onchain Registry API", link: "/chain/registry-api" },
          { text: "Node Providers", link: "/chain/node-providers" },
          { text: "Block Explorers", link: "/chain/block-explorers" },
          { text: "Network Faucets", link: "/chain/network-faucets" },
          { text: "Oracles", link: "/chain/oracles" },
          { text: "Data Indexers", link: "/chain/data-indexers" },
          { text: "Cross-chain", link: "/chain/cross-chain" },
          { text: "Account Abstraction", link: "/chain/account-abstraction" },
          { text: "Onramps", link: "/chain/onramps" }
        ]
      }
    ]
  },
  {
    text: "Use Cases",
    items: [
      {
        text: "Onboard any user",
        link: "/use-cases/onboard-any-user"
      },
      {
        text: "Accept crypto payments",
        link: "/use-cases/accept-crypto-payments"
      },
      {
        text: "Launch AI Agents",
        link: "/use-cases/launch-ai-agents"
      },
      {
        text: "Decentralize your social app",
        link: "/use-cases/decentralize-social-app"
      },
      {
        text: "DeFi your app",
        link: "/use-cases/defi-your-app"
      },
      {
        text: "Go gasless",
        link: "/use-cases/go-gasless"
      }
    ]
  },
  {
    text: "Cookbook",
    items: [
      {
        text: "Use Case Guides",
        collapsed: true,
        items: [
          {
            text: "Payments & Commerce",
            items: [
              { text: "Accept Crypto Payments", link: "/cookbook/use-case-guides/commerce/accept-crypto-payments" },
              { text: "Build an E-commerce App", link: "/cookbook/use-case-guides/commerce/build-an-ecommerce-app" },
              { text: "Deploy a Shopify Storefront", link: "/cookbook/use-case-guides/commerce/deploy-a-shopify-storefront" },
              { text: "Transaction Guide", link: "/cookbook/life-cycle-guides/activating/transactions" }
            ]
          },
          {
            text: "NFTs & Digital Assets",
            items: [
              { text: "NFT Minting with Zora", link: "/cookbook/use-case-guides/creator/nft-minting-with-zora" },
              { text: "No-Code NFT Minting", link: "/cookbook/life-cycle-guides/activating/no-code-minting" },
              { text: "NFT Minting Guide", link: "/cookbook/life-cycle-guides/activating/nft-minting" },
              { text: "Convert Farcaster Frame to Open Frame", link: "/cookbook/use-case-guides/creator/convert-farcaster-frame-to-open-frame" }
            ]
          },
          {
            text: "DeFi & Financial Tools",
            items: [
              { text: "Add In-App Funding (Onramp)", link: "/cookbook/use-case-guides/finance/build-a-smart-wallet-funding-app" },
              { text: "Access Real-World Data (Chainlink)", link: "/cookbook/use-case-guides/finance/access-real-world-data-chainlink" },
              { text: "Access Real-Time Asset Data (Pyth)", link: "/cookbook/use-case-guides/finance/access-real-time-asset-data-pyth-price-feeds" }
            ]
          },
          {
            text: "Growth & Distribution",
            items: [
              {
                text: "Social & Distribution",
                items: [
                  { text: "Cast Actions", link: "/cookbook/life-cycle-guides/growing/cast-actions" },
                  { text: "Hyperframes", link: "/cookbook/life-cycle-guides/growing/hyperframes" }
                ]
              },
              {
                text: "Deployment & Access",
                items: [
                  { text: "Deploy to Vercel", link: "/cookbook/life-cycle-guides/growing/deploy-to-vercel" },
                  { text: "Gating and Redirects", link: "/cookbook/life-cycle-guides/growing/gating-and-redirects" }
                ]
              },
              {
                text: "User Engagement",
                items: [
                  { text: "Email Campaigns", link: "/cookbook/life-cycle-guides/retaining/create-email-campaigns" }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "General Development",
        collapsed: true,
        items: [
          {
            text: "Smart Contract Development",
            items: [
              {
                text: "Hardhat",
                items: [
                  { text: "Deploy with Hardhat", link: "/cookbook/general-development/smart-contract-development/hardhat/deploy-with-hardhat" },
                  { text: "Debugging Smart Contracts", link: "/cookbook/general-development/smart-contract-development/hardhat/debugging-smart-contracts" },
                  { text: "Optimizing Gas Usage", link: "/cookbook/general-development/smart-contract-development/hardhat/optimizing-gas-usage" },
                  { text: "Reducing Contract Size", link: "/cookbook/general-development/smart-contract-development/hardhat/reducing-contract-size" },
                  { text: "Analyzing Test Coverage", link: "/cookbook/general-development/smart-contract-development/hardhat/analyzing-test-coverage" }
                ]
              },
              {
                text: "Foundry",
                items: [
                  { text: "Deploy with Foundry", link: "/cookbook/general-development/smart-contract-development/foundry/deploy-with-foundry" },
                  { text: "Setup with Base", link: "/cookbook/general-development/smart-contract-development/foundry/setup-with-base" },
                  { text: "Testing Smart Contracts", link: "/cookbook/general-development/smart-contract-development/foundry/testing-smart-contracts" }
                ]
              },
              {
                text: "Remix",
                items: [
                  { text: "Deploy with Remix", link: "/cookbook/general-development/smart-contract-development/remix/deploy-with-remix" }
                ]
              },
              {
                text: "Tenderly",
                items: [
                  { text: "Deploy with Tenderly", link: "/cookbook/general-development/smart-contract-development/tenderly/deploy-with-tenderly" }
                ]
              },
              {
                text: "ThirdWeb",
                items: [
                  { text: "Deploy with ThirdWeb", link: "/cookbook/general-development/smart-contract-development/thirdweb/deploy-with-thirdweb" },
                  { text: "Build with ThirdWeb", link: "/cookbook/general-development/smart-contract-development/thirdweb/build-with-thirdweb" },
                  { text: "ThirdWeb SDK", link: "/cookbook/general-development/smart-contract-development/thirdweb/thirdweb-sdk" },
                  { text: "ThirdWeb CLI", link: "/cookbook/general-development/smart-contract-development/thirdweb/thirdweb-cli" }
                ]
              }
            ]
          },
          {
            text: "NFTs",
            items: [
              { text: "Simple Onchain NFTs", link: "/cookbook/general-development/nfts/simple-onchain-nfts" },
              { text: "Dynamic NFTs", link: "/cookbook/general-development/nfts/dynamic-nfts" },
              { text: "Complex Onchain NFTs", link: "/cookbook/general-development/nfts/complex-onchain-nfts" },
              { text: "Signature Mint", link: "/cookbook/general-development/nfts/signature-mint" },
              { text: "ThirdWeb Unreal NFT Items", link: "/cookbook/general-development/nfts/thirdweb-unreal-nft-items" }
            ]
          },
          {
            text: "IPFS",
            items: [
              { text: "Deploy with Fleek", link: "/cookbook/general-development/ipfs/deploy-with-fleek" }
            ]
          },
          {
            text: "Token Gating",
            items: [
              { text: "Gate IRL Events with Nouns", link: "/cookbook/general-development/token-gating/gate-irl-events-with-nouns" }
            ]
          },
          {
            text: "Client-Side Development",
            items: [
              { text: "Introduction to Providers", link: "/cookbook/general-development/client-side-development/introduction-to-providers" }
            ]
          },
          {
            text: "Account Abstraction",
            items: [
              { text: "Using Biconomy", link: "/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-biconomy" },
              { text: "Using Particle Network", link: "/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-particle-network" },
              { text: "Using Privy and Base Paymaster", link: "/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-privy-and-the-base-paymaster" },
              { text: "Gasless Transactions with Paymaster", link: "/cookbook/general-development/account-abstraction/gasless-transactions-with-paymaster" }
            ]
          },
          {
            text: "Cross-Chain",
            items: [
              { text: "Bridge Tokens with LayerZero", link: "/cookbook/general-development/cross-chain/bridge-tokens-with-layerzero" },
              { text: "Send Messages and Tokens from Base (Chainlink)", link: "/cookbook/general-development/cross-chain/send-messages-and-tokens-chainlink" }
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Feedback",
    items: [
      {
        text: "Get help \u2197",
        link: "https://discord.com/invite/buildonbase"
      },
      {
        text: "Bug bounty \u2197",
        link: "https://hackerone.com/coinbase"
      }
    ]
  }
];

// vocs.config.tsx
import { ModuleKind, ModuleResolutionKind } from "file:///Users/brendan_cb/dev/opensource/base/web/apps/base-docs/node_modules/typescript/lib/typescript.js";
import path from "path";
import { Fragment, jsx, jsxs } from "file:///Users/brendan_cb/dev/opensource/base/web/apps/base-docs/node_modules/react/jsx-runtime.js";
var baseConfig = {
  //basePath: "https://docs.base.org/docs", // Comment out in local dev
  baseUrl: "/",
  title: "Base Docs",
  description: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2",
  iconUrl: {
    light: "img/favicon.ico",
    dark: "img/favicon.ico"
  }
  // logoUrl: {
  //   // light: ,
  //   // dark: ,
  // }
};
var bannerConfig = {
  // If we don't fork vocs, the banner can be overridden as seen below to add a header
  // banner: {
  //   content: (
  //     <div className="vocs_banner_content">
  //       <div className="left-column">
  //         {/* Optional: Add content here if needed in the future */}
  //       </div>
  //       <div className="center-column">
  //         <nav className="navigation-links">
  //           <a href="/">API</a>
  //           <a href="/docs">Tools</a>
  //           <a href="/blog">Blog</a>
  //           <a href="/community">Community</a>
  //         </nav>
  //       </div>
  //       <div className="right-column">
  //         <button
  //           className="connect-wallet-button"
  //           onClick={() => {
  //             // Add your wallet connection logic here
  //           }}
  //         >
  //           Connect Wallet
  //         </button>
  //       </div>
  //     </div>
  //   ),
  //   height: '99px', // Must match height in CSS
  //   dismissable: 'false', // Make it permanent
  //   backgroundColor: '#232225', // Charcoal color
  // }
};
var twoslashConfig = {
  twoslash: {
    compilerOptions: {
      allowUmdGlobalAccess: true,
      esModuleInterop: true,
      module: ModuleKind.NodeNext,
      //ModuleKind.Preserve
      moduleResolution: ModuleResolutionKind.NodeNext
    }
  }
};
var sidebarConfig = {
  sidebar
};
var topNavConfig = {
  topNav: [
    { text: "Get Help", link: "https://discord.com/invite/buildonbase?utm_source=dotorg&utm_medium=nav" },
    {
      text: "base.org",
      link: "https://base.org"
    }
  ],
  layout: "right"
};
var markdownConfig = {
  code: {
    themes: {
      light: "github-light",
      dark: "github-dark"
    }
  }
};
var pluggableConfig = {
  markdown: {
    remarkPlugins: [
      // Add your remark plugins here
    ]
  }
};
var blogConfig = {
  blogDir: "./blog"
};
var headConfig = {
  head: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Base | Docs" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://docs.base.org/img/base-open-graph.png" }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:title", content: "Base | Docs" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:image", content: "https://docs.base.org/img/base-open-graph.png" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:description", content: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:domain", content: "base.org" })
  ] })
};
var searchConfig = {
  search: {
    fields: ["title", "content", "productLine", "docType", "userType"],
    // Fields to index
    storeFields: ["title", "snippet", "productLine", "docType"],
    // Fields to return in results
    searchOptions: {
      prefix: true,
      // Autocomplete
      fuzzy: 0.2,
      // Typo tolerance
      boost: { docType: { "API": 2, "Guide": 1.5 }, recencyScore: 2 },
      // Boosting by document type and recency
      filter: (doc) => doc.productLine === "Base Protocol" || doc.productLine === "OnchainKit",
      // Faceted search
      highlight: true,
      // Instant search result preview
      limit: 10
      // Pagination
    }
  }
};
var vocs_config_default = defineConfig({
  ...baseConfig,
  ...bannerConfig,
  ...sidebarConfig,
  ...topNavConfig,
  ...blogConfig,
  ...headConfig,
  ...markdownConfig,
  ...pluggableConfig,
  ...searchConfig,
  ...twoslashConfig,
  vite: {
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "docs"),
        "@/components": path.join(process.cwd(), "docs/components"),
        "@/pages": path.join(process.cwd(), "docs/pages"),
        "@/styles": path.join(process.cwd(), "docs/styles"),
        "@/lib": path.join(process.cwd(), "docs/lib"),
        "@/utils": path.join(process.cwd(), "docs/utils"),
        "@/types": path.join(process.cwd(), "docs/types")
      }
    }
  }
});
export {
  vocs_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHN4IiwgInNpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZvY3MnXG5pbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSAnLi9zaWRlYmFyLnRzJ1xuaW1wb3J0IHsgTW9kdWxlS2luZCwgTW9kdWxlUmVzb2x1dGlvbktpbmQgfSBmcm9tICd0eXBlc2NyaXB0J1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgYmFzZUNvbmZpZyA9IHtcbiAgLy9iYXNlUGF0aDogXCJodHRwczovL2RvY3MuYmFzZS5vcmcvZG9jc1wiLCAvLyBDb21tZW50IG91dCBpbiBsb2NhbCBkZXZcbiAgYmFzZVVybDogJy8nLFxuICB0aXRsZTogJ0Jhc2UgRG9jcycsXG4gIGRlc2NyaXB0aW9uOiAnRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyJyxcbiAgaWNvblVybDoge1xuICAgIGxpZ2h0OiAnaW1nL2Zhdmljb24uaWNvJyxcbiAgICBkYXJrOiAnaW1nL2Zhdmljb24uaWNvJyxcbiAgfSxcbiAgLy8gbG9nb1VybDoge1xuICAvLyAgIC8vIGxpZ2h0OiAsXG4gIC8vICAgLy8gZGFyazogLFxuICAvLyB9XG59XG5cbi8vIHVzZWQgZm9yIGdsb2JhbCBkaXNtaXNzYWJsZSBhbm5vdW5jZW1lbnRzLCBldGNcbmNvbnN0IGJhbm5lckNvbmZpZyA9IHtcbiAgLy8gSWYgd2UgZG9uJ3QgZm9yayB2b2NzLCB0aGUgYmFubmVyIGNhbiBiZSBvdmVycmlkZGVuIGFzIHNlZW4gYmVsb3cgdG8gYWRkIGEgaGVhZGVyXG4gIC8vIGJhbm5lcjoge1xuICAvLyAgIGNvbnRlbnQ6IChcbiAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwidm9jc19iYW5uZXJfY29udGVudFwiPlxuICAvLyAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtY29sdW1uXCI+XG4gIC8vICAgICAgICAgey8qIE9wdGlvbmFsOiBBZGQgY29udGVudCBoZXJlIGlmIG5lZWRlZCBpbiB0aGUgZnV0dXJlICovfVxuICAvLyAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXItY29sdW1uXCI+XG4gIC8vICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZpZ2F0aW9uLWxpbmtzXCI+XG4gIC8vICAgICAgICAgICA8YSBocmVmPVwiL1wiPkFQSTwvYT5cbiAgLy8gICAgICAgICAgIDxhIGhyZWY9XCIvZG9jc1wiPlRvb2xzPC9hPlxuICAvLyAgICAgICAgICAgPGEgaHJlZj1cIi9ibG9nXCI+QmxvZzwvYT5cbiAgLy8gICAgICAgICAgIDxhIGhyZWY9XCIvY29tbXVuaXR5XCI+Q29tbXVuaXR5PC9hPlxuICAvLyAgICAgICAgIDwvbmF2PlxuICAvLyAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1jb2x1bW5cIj5cbiAgLy8gICAgICAgICA8YnV0dG9uXG4gIC8vICAgICAgICAgICBjbGFzc05hbWU9XCJjb25uZWN0LXdhbGxldC1idXR0b25cIlxuICAvLyAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAvLyAgICAgICAgICAgICAvLyBBZGQgeW91ciB3YWxsZXQgY29ubmVjdGlvbiBsb2dpYyBoZXJlXG4gIC8vICAgICAgICAgICB9fVxuICAvLyAgICAgICAgID5cbiAgLy8gICAgICAgICAgIENvbm5lY3QgV2FsbGV0XG4gIC8vICAgICAgICAgPC9idXR0b24+XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgPC9kaXY+XG4gIC8vICAgKSxcbiAgLy8gICBoZWlnaHQ6ICc5OXB4JywgLy8gTXVzdCBtYXRjaCBoZWlnaHQgaW4gQ1NTXG4gIC8vICAgZGlzbWlzc2FibGU6ICdmYWxzZScsIC8vIE1ha2UgaXQgcGVybWFuZW50XG4gIC8vICAgYmFja2dyb3VuZENvbG9yOiAnIzIzMjIyNScsIC8vIENoYXJjb2FsIGNvbG9yXG4gIC8vIH1cbn1cblxuLy8gUmV1c2FibGUgbmF2IGxpbmsgc3R5bGVzIChpZiBub3QgdXNpbmcgVGFpbHdpbmQpXG5jb25zdCBuYXZMaW5rU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMnLFxuICAnOmhvdmVyJzogeyBvcGFjaXR5OiAwLjcgfSxcbn1cblxuY29uc3QgdHdvc2xhc2hDb25maWcgPSB7XG4gIHR3b3NsYXNoOiB7XG4gICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICBhbGxvd1VtZEdsb2JhbEFjY2VzczogdHJ1ZSxcbiAgICAgIGVzTW9kdWxlSW50ZXJvcDogdHJ1ZSxcbiAgICAgIG1vZHVsZTogTW9kdWxlS2luZC5Ob2RlTmV4dCwgLy9Nb2R1bGVLaW5kLlByZXNlcnZlXG4gICAgICBtb2R1bGVSZXNvbHV0aW9uOiBNb2R1bGVSZXNvbHV0aW9uS2luZC5Ob2RlTmV4dCxcbiAgICB9LFxuICB9XG59XG5cbmNvbnN0IHNpZGViYXJDb25maWcgPSB7XG4gIHNpZGViYXI6IHNpZGViYXJcbn1cblxuY29uc3QgdG9wTmF2Q29uZmlnID0ge1xuICB0b3BOYXY6IFtcbiAgICB7IHRleHQ6ICdHZXQgSGVscCcsIGxpbms6ICdodHRwczovL2Rpc2NvcmQuY29tL2ludml0ZS9idWlsZG9uYmFzZT91dG1fc291cmNlPWRvdG9yZyZ1dG1fbWVkaXVtPW5hdid9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdiYXNlLm9yZycsXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9iYXNlLm9yZycsXG4gICAgfVxuICBdLFxuICBsYXlvdXQ6ICdyaWdodCcsXG59XG5cbmNvbnN0IG1hcmtkb3duQ29uZmlnID0ge1xuICBjb2RlOiB7XG4gICAgdGhlbWVzOiB7XG4gICAgICBsaWdodDogJ2dpdGh1Yi1saWdodCcsXG4gICAgICBkYXJrOiAnZ2l0aHViLWRhcmsnLFxuICAgIH1cbiAgfVxufVxuXG4vLyBwbHVnaW5zIGZvciB0cmFuc2Zvcm1pbmcgbWFya2Rvd246IGh0dHBzOi8vZ2l0aHViLmNvbS9yZW1hcmtqcy9yZW1hcmsvYmxvYi9tYWluL2RvYy9wbHVnaW5zLm1kI2xpc3Qtb2YtcGx1Z2luc1xuY29uc3QgcGx1Z2dhYmxlQ29uZmlnID17XG4gIG1hcmtkb3duOiB7XG4gICAgcmVtYXJrUGx1Z2luczogW1xuICAgICAgLy8gQWRkIHlvdXIgcmVtYXJrIHBsdWdpbnMgaGVyZVxuICAgIF1cbiAgfVxufVxuXG5cbmNvbnN0IGJsb2dDb25maWcgPSB7XG4gIGJsb2dEaXI6IFwiLi9ibG9nXCJcbn1cblxuLy8gQ2FuIGRlZmluZSBwYXRoIG9iamVjdHMgd2hpY2ggcmV0dXJuIGRpZmZlcmVudCBtZXRhIHRhZ3MgZm9yIG1vcmUgY29udHJvbFxuY29uc3QgaGVhZENvbmZpZyA9IHtcbiAgaGVhZDogKFxuICAgIDw+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnR5cGVcIiBjb250ZW50PVwid2Vic2l0ZVwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cIkJhc2UgfCBEb2NzXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9kb2NzLmJhc2Uub3JnL2ltZy9iYXNlLW9wZW4tZ3JhcGgucG5nXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwiRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjp0aXRsZVwiIGNvbnRlbnQ9XCJCYXNlIHwgRG9jc1wiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9kb2NzLmJhc2Uub3JnL2ltZy9iYXNlLW9wZW4tZ3JhcGgucG5nXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJFeHBsb3JlIHRoZSBkb2N1bWVudGF0aW9uIGZvciBCYXNlLCBhIHNlY3VyZSwgbG93LWNvc3QsIGJ1aWxkZXItZnJpZW5kbHkgRXRoZXJldW0gTDJcIiAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeV9sYXJnZV9pbWFnZVwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6ZG9tYWluXCIgY29udGVudD1cImJhc2Uub3JnXCIgLz5cbiAgICA8Lz5cbiAgKSxcbn1cblxuLy8gdm9jcyB1c2VzIE1pbmlTZWFyY2gsIGNoZWNrIGNvbmZpZ3NcbmNvbnN0IHNlYXJjaENvbmZpZyA9IHsgXG4gIHNlYXJjaDoge1xuICAgIGZpZWxkczogWyd0aXRsZScsICdjb250ZW50JywgJ3Byb2R1Y3RMaW5lJywgJ2RvY1R5cGUnLCAndXNlclR5cGUnXSwgIC8vIEZpZWxkcyB0byBpbmRleFxuICAgIHN0b3JlRmllbGRzOiBbJ3RpdGxlJywgJ3NuaXBwZXQnLCAncHJvZHVjdExpbmUnLCAnZG9jVHlwZSddLCAvLyBGaWVsZHMgdG8gcmV0dXJuIGluIHJlc3VsdHNcbiAgICBzZWFyY2hPcHRpb25zOiB7XG4gICAgICBwcmVmaXg6IHRydWUsIC8vIEF1dG9jb21wbGV0ZVxuICAgICAgZnV6enk6IDAuMiwgIC8vIFR5cG8gdG9sZXJhbmNlXG4gICAgICBib29zdDogeyBkb2NUeXBlOiB7ICdBUEknOiAyLCAnR3VpZGUnOiAxLjUgfSwgcmVjZW5jeVNjb3JlOiAyIH0sIC8vIEJvb3N0aW5nIGJ5IGRvY3VtZW50IHR5cGUgYW5kIHJlY2VuY3lcbiAgICAgIGZpbHRlcjogKGRvYzogeyBwcm9kdWN0TGluZTogc3RyaW5nIH0pID0+IFxuICAgICAgICBkb2MucHJvZHVjdExpbmUgPT09ICdCYXNlIFByb3RvY29sJyB8fCBkb2MucHJvZHVjdExpbmUgPT09ICdPbmNoYWluS2l0JywgLy8gRmFjZXRlZCBzZWFyY2hcbiAgICAgIGhpZ2hsaWdodDogdHJ1ZSwgLy8gSW5zdGFudCBzZWFyY2ggcmVzdWx0IHByZXZpZXdcbiAgICAgIGxpbWl0OiAxMCAvLyBQYWdpbmF0aW9uXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC4uLmJhc2VDb25maWcsXG4gIC4uLmJhbm5lckNvbmZpZyxcbiAgLi4uc2lkZWJhckNvbmZpZyxcbiAgLi4udG9wTmF2Q29uZmlnLFxuICAuLi5ibG9nQ29uZmlnLFxuICAuLi5oZWFkQ29uZmlnLFxuICAuLi5tYXJrZG93bkNvbmZpZyxcbiAgLi4ucGx1Z2dhYmxlQ29uZmlnLFxuICAuLi5zZWFyY2hDb25maWcsXG4gIC4uLnR3b3NsYXNoQ29uZmlnLFxuICB2aXRlOiB7XG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MnKSxcbiAgICAgICAgJ0AvY29tcG9uZW50cyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy9jb21wb25lbnRzJyksXG4gICAgICAgICdAL3BhZ2VzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3BhZ2VzJyksXG4gICAgICAgICdAL3N0eWxlcyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy9zdHlsZXMnKSxcbiAgICAgICAgJ0AvbGliJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL2xpYicpLFxuICAgICAgICAnQC91dGlscyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy91dGlscycpLFxuICAgICAgICAnQC90eXBlcyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy90eXBlcycpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9icmVuZGFuX2NiL2Rldi9vcGVuc291cmNlL2Jhc2Uvd2ViL2FwcHMvYmFzZS1kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYnJlbmRhbl9jYi9kZXYvb3BlbnNvdXJjZS9iYXNlL3dlYi9hcHBzL2Jhc2UtZG9jcy9zaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9icmVuZGFuX2NiL2Rldi9vcGVuc291cmNlL2Jhc2Uvd2ViL2FwcHMvYmFzZS1kb2NzL3NpZGViYXIudHNcIjtpbXBvcnQgdHlwZSB7IFNpZGViYXIgfSBmcm9tICd2b2NzJ1xuXG4vLyBOb3RlOiBjYXJlZnVsIG9mIG5hbWUgY2xhc2hpbmcgYmV0d2VlbiBzaWRlYmFyIGl0ZW1zIGFuZCBkb2NzIHBhZ2VzLiBcbi8vIEZvciBleGFtcGxlLCAnUXVpY2tzdGFydCcgaXMgdXNlZCBmb3IgYm90aCBzaWRlYmFyIGFuZCBwYWdlIG5hbWVzLlxuLy8gSWYgZG9jcyBhcmUgcGFydCBvZiBhIHNpZGViYXIgY29sbGVjdGlvbiwgdGhleSBzaG91bGQgYmUgaW4gYSBzdWJmb2xkZXJcbmV4cG9ydCBjb25zdCBzaWRlYmFyOiBTaWRlYmFyID0gW1xuICB7XG4gICAgdGV4dDogJ092ZXJ2aWV3JyxcbiAgICBsaW5rOiAnLycsXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnUXVpY2tzdGFydCcsXG4gICAgbGluazogJy9xdWlja3N0YXJ0JyxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdCdWlsZGVyIEtpdHMnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdPbmNoYWluS2l0JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdHZXR0aW5nIFN0YXJ0ZWQnLCBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZ2V0dGluZy1zdGFydGVkJyB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnN0YWxsYXRpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTmV4dC5qcycsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vbmV4dGpzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdWaXRlJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi92aXRlJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdSZW1peCcsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vcmVtaXgnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FzdHJvJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi9hc3RybycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbktpdFByb3ZpZGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvY29uZmlnL29uY2hhaW5raXQtcHJvdmlkZXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDb250cmlidXRpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdIb3cgdG8gQ29udHJpYnV0ZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9jb250cmlidXRpb24nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlcG9ydCBhIEJ1ZycsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9yZXBvcnRpbmctYnVnJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnR3VpZGVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTGlmZWN5Y2xlIFN0YXR1cycsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9saWZlY3ljbGUtc3RhdHVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUYWlsd2luZCBDU1MgSW50ZWdyYXRpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdGFpbHdpbmQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RoZW1lIEN1c3RvbWl6YXRpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdGhlbWVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdVc2UgQmFzZW5hbWUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdXNlLWJhc2VuYW1lLWluLW9uY2hhaW4tYXBwJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVGVtcGxhdGVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbiBORlQgQXBwIFx1MjE5NycsXG4gICAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vb2NrLW1pbnQudmVyY2VsLmFwcC8nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ09uY2hhaW4gQ29tbWVyY2UgQXBwIFx1MjE5NycsXG4gICAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vb25jaGFpbi1jb21tZXJjZS10ZW1wbGF0ZS52ZXJjZWwuYXBwLycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbiBTb2NpYWwgUHJvZmlsZSBcdTIxOTcnLFxuICAgICAgICAgICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vZmFrZXBpeGVscy9vY2staWRlbnRpdHknLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDb21wb25lbnRzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDaGVja291dCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9jaGVja291dC9jaGVja291dCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRnJhbWUnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdGcmFtZU1ldGFkYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2ZyYW1lL2ZyYW1lLW1ldGFkYXRhJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZEJ1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9mdW5kL2Z1bmQtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2FkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0F2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9hdmF0YXInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0JhZGdlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2JhZGdlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdJZGVudGl0eUNhcmQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvaWRlbnRpdHktY2FyZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9uYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdTb2NpYWxzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3NvY2lhbHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdORlRDYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L21pbnQvbmZ0LWNhcmQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ05GVE1pbnRDYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L21pbnQvbmZ0LW1pbnQtY2FyZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1N3YXAnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvc3dhcC9zd2FwJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwU2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvc3dhcC9zd2FwLXNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuQ2hpcCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1jaGlwJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbkltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLWltYWdlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlblJvdycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1yb3cnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuU2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLXNlYXJjaCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5TZWxlY3REcm9wZG93bicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1zZWxlY3QtZHJvcGRvd24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXREcm9wZG93bkJhc2VuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3dhbGxldC93YWxsZXQtZHJvcGRvd24tYmFzZW5hbWUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRGlzY29ubmVjdCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWRpc2Nvbm5lY3QnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRnVuZExpbmsnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvd2FsbGV0L3dhbGxldC1kcm9wZG93bi1mdW5kLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duTGluaycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdBUEknLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdNaW50JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0VG9rZW5EZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwaS9nZXQtdG9rZW4tZGV0YWlscycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0TWludERldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2dldC1taW50LWRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2J1aWxkTWludFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwaS9idWlsZC1taW50LXRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnYnVpbGRTd2FwVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2J1aWxkLXN3YXAtdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldFN3YXBRdW90ZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LXN3YXAtcXVvdGUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0VG9rZW5zJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LXRva2VucycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1V0aWxpdGllcycsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NvbmZpZycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzQmFzZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY29uZmlnL2lzLWJhc2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzRXRoZXJldW0nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2NvbmZpZy9pcy1ldGhlcmV1bScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldE9ucmFtcEJ1eVVybCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZnVuZC9nZXQtb25yYW1wLWJ1eS11cmwnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0ZyYW1lJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0RmFyY2FzdGVyVXNlckFkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZhcmNhc3Rlci9nZXQtZmFyY2FzdGVyLXVzZXItYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0RnJhbWVIdG1sUmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL2dldC1mcmFtZS1odG1sLXJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGcmFtZU1lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL2dldC1mcmFtZS1tZXNzYWdlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGcmFtZU1ldGFkYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mcmFtZS9nZXQtZnJhbWUtbWV0YWRhdGEnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldFhtdHBGcmFtZU1lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3htdHAvZ2V0LXhtdHAtZnJhbWUtbWVzc2FnZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnaXNYbXRwRnJhbWVSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC94bXRwL2lzLXhtdHAtZnJhbWUtcmVxdWVzdCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRBZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0QXR0ZXN0YXRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYXR0ZXN0YXRpb25zJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRBdmF0YXInLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1hdmF0YXInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1uYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VBZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAndXNlQXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtYXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtbmFtZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW4nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdmb3JtYXRBbW91bnQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3Rva2VuL2Zvcm1hdC1hbW91bnQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzVmFsaWRBQUVudHJ5cG9pbnQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3dhbGxldC9pcy12YWxpZC1hYS1lbnRyeXBvaW50JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdpc1dhbGxldEFDb2luYmFzZVNtYXJ0V2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvaXMtd2FsbGV0LWEtY29pbmJhc2Utc21hcnQtd2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVHlwZXMnLFxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdBUEknLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvYXBpL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDaGVja291dCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9jaGVja291dC90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2NvbmZpZy90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRmFyY2FzdGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZhcmNhc3Rlci90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mdW5kL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGcmFtZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mcmFtZS90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaWRlbnRpdHkvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvbWludC90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9zd2FwL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC90b2tlbi90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvdHJhbnNhY3Rpb24vdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0FnZW50S2l0IFx1MjE5NycsXG4gICAgICAgIGxpbms6ICdodHRwczovL2RvY3MuY2RwLmNvaW5iYXNlLmNvbS9hZ2VudGtpdC9kb2NzL3dlbGNvbWUnLFxuICAgICAgfSxcbiAgICBdXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnQmxvY2tzcGFjZSBUb29scycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1BheW1hc3RlciBcdTIxOTcnLFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kb2NzLmNkcC5jb2luYmFzZS5jb20vcGF5bWFzdGVyL2RvY3Mvd2VsY29tZScsXG4gICAgICB9LFxuICAgICAgLy8geyBQRU5ESU5HIEFQUENIQUlOIFJFTEVBU0UgMi8yNVxuICAgICAgLy8gICB0ZXh0OiAnQXBwY2hhaW5zIFx1MjE5NycsXG4gICAgICAvLyAgIGxpbms6ICdodHRwczovL2RvY3MuY2RwLmNvaW5iYXNlLmNvbS9wYXltYXN0ZXIvZG9jcy93ZWxjb21lJyxcbiAgICAgIC8vIH0sXG4gICAgXVxuICB9LFxuICB7XG4gICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnU21hcnQgV2FsbGV0JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiSW50cm9kdWN0aW9uXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6IFwiSW5zdGFsbCBmb3IgV2ViXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2luc3RhbGwtd2ViXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIkluc3RhbGwgZm9yIFJlYWN0IE5hdGl2ZVwiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9pbnN0YWxsLXJlYWN0LW5hdGl2ZVwiIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJSZWNvbW1lbmQgTGlicmFyaWVzXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L3JlY29tbWVuZGVkLWxpYnJhcmllc1wiIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJTdGFydGVyIFRlbXBsYXRlc1wiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9zdGFydGVyLXRlbXBsYXRlc1wiIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICBcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkZlYXR1cmVzXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJCdWlsdC1pbiBGZWF0dXJlc1wiLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiU2luZ2xlIFNpZ24gT25cIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvc2luZ2xlLXNpZ24tb25cIiB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIk5ldHdvcmtzXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ZlYXR1cmVzL25ldHdvcmtzXCIgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJQYXNza2V5c1wiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9wYXNza2V5c1wiIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiUmVjb3ZlcnlcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvcmVjb3Zlcnkta2V5c1wiIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiTWFnaWNTcGVuZFwiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9tYWdpYy1zcGVuZFwiIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiT3B0aW9uYWwgRmVhdHVyZXNcIixcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIkdhcy1mcmVlIFRyYW5zYWN0aW9uc1wiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9zcG9uc29yZWQtdHJhbnNhY3Rpb25zXCIgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJPbmUtY2xpY2sgVHJhbnNhY3Rpb25zXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ZlYXR1cmVzL3NwZW5kLXBlcm1pc3Npb25zXCIgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJCYXRjaCBUcmFuc2FjdGlvbnNcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvYmF0Y2gtb3BlcmF0aW9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiQ3VzdG9tIEdhcyBUb2tlbnNcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvY3VzdG9tLWdhcy10b2tlbnNcIiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJJbXBvcnRhbnQgRGV0YWlsc1wiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlNpZ25hdHVyZSBWZXJpZmljYXRpb25cIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvaW1wb3J0YW50LWRldGFpbHMvc2lnbmF0dXJlLXZlcmlmaWNhdGlvblwiIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJQb3B1cHNcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvaW1wb3J0YW50LWRldGFpbHMvcG9wdXBzXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlNpbXVsYXRpb25zXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ltcG9ydGFudC1kZXRhaWxzL3NpbXVsYXRpb25zXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlBvcnRhYmlsaXR5XCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ltcG9ydGFudC1kZXRhaWxzL3BvcnRhYmlsaXR5XCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIkdhcyBVc2FnZVwiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9pbXBvcnRhbnQtZGV0YWlscy9nYXMtdXNhZ2VcIiB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IFwiU2VsZiBDYWxsc1wiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9pbXBvcnRhbnQtZGV0YWlscy9zZWxmLWNhbGxzXCIgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlNES1wiLFxuICAgICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcImNyZWF0ZUNvaW5iYXNlV2FsbGV0U0RLXCIsXG4gICAgICAgICAgICAgICAgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NyZWF0ZS1jb2luYmFzZS13YWxsZXQtc2RrXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1R1dG9yaWFscycsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NyZWF0ZSBhIE5ldyBXZWIgQXBwJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNpbmcgT25jaGFpbiBBcHAgVGVtcGxhdGUnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvY3JlYXRlLWFwcC91c2luZy1vbmNoYWluLWFwcC10ZW1wbGF0ZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1VzaW5nIFdhZ21pJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2NyZWF0ZS1hcHAvdXNpbmctd2FnbWknIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVXBkYXRlIEV4aXN0aW5nIEFwcCcsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy91cGRhdGUtZXhpc3RpbmctYXBwJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdSZWFjdCBOYXRpdmUgSW50ZWdyYXRpb24nLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvcmVhY3QtbmF0aXZlLWludGVncmF0aW9uJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdDcmVhdGUgV2FsbGV0IEJ1dHRvbicsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9jb21wb25lbnRzL2NyZWF0ZS13YWxsZXQtYnV0dG9uJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTaWduYXR1cmUgVmVyaWZpY2F0aW9uJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NpZ25hdHVyZS12ZXJpZmljYXRpb24nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1NJV0UnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc2l3ZScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQmF0Y2ggVHJhbnNhY3Rpb25zJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2JhdGNoLXRyYW5zYWN0aW9ucycgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTcGVuZCBQZXJtaXNzaW9ucycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL292ZXJ2aWV3JyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUXVpY2sgU3RhcnQnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc3BlbmQtcGVybWlzc2lvbnMvcXVpY2stc3RhcnQnIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBUEkgUmVmZXJlbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdDbGllbnQgUmVzb3VyY2VzJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2UvY2xpZW50LXJlc291cmNlcycgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdTcGVuZFBlcm1pc3Npb25NYW5hZ2VyJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2Uvc3BlbmRwZXJtaXNzaW9ubWFuYWdlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdXYWxsZXQgRmV0Y2hQZXJtaXNzaW9ucycsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9hcGktcmVmZXJlbmNlL3dhbGxldC1mZXRjaHBlcm1pc3Npb25zJyB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0Jhc2VuYW1lcycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVHV0b3JpYWxzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0Jhc2VuYW1lcyBXYWdtaSBUdXRvcmlhbCcsIGxpbms6ICcvaWRlbnRpdHkvYmFzZW5hbWVzL2Jhc2VuYW1lcy13YWdtaS10dXRvcmlhbCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQmFzZW5hbWVzIE9uY2hhaW5LaXQgVHV0b3JpYWwnLCBsaW5rOiAnL2lkZW50aXR5L2Jhc2VuYW1lcy9iYXNlbmFtZXMtb25jaGFpbmtpdC10dXRvcmlhbCcgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnRkFRICYgVHJvdWJsZXNob290aW5nJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0Jhc2VuYW1lcyBGQVEnLCBsaW5rOiAnL2lkZW50aXR5L2Jhc2VuYW1lcy9iYXNlbmFtZXMtZmFxJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1ZlcmlmaWNhdGlvbnMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1F1aWNrc3RhcnQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnUXVpY2tzdGFydCcsIGxpbms6ICcvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy9xdWlja3N0YXJ0JyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnV2VsY29tZScsIGxpbms6ICcvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy93ZWxjb21lJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdVc2UgQ2FzZXMnLCBsaW5rOiAnL2lkZW50aXR5L3ZlcmlmaWNhdGlvbnMvdXNlLWNhc2VzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdEb2N1bWVudGF0aW9uJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0F0dGVzdGF0aW9ucycsIGxpbms6ICcvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy9hdHRlc3RhdGlvbnMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRkFRICYgVHJvdWJsZXNob290aW5nJywgbGluazogJy9pZGVudGl0eS92ZXJpZmljYXRpb25zL2ZhcS10cm91Ymxlc2hvb3RpbmcnIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1N1cHBvcnQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRGlzY29yZCBDb21tdW5pdHknLCBsaW5rOiAnL2lkZW50aXR5L3ZlcmlmaWNhdGlvbnMvdmVyaWZpY2F0aW9ucy1kaXNjb3JkJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogJ0NoYWluJyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnR2VuZXJhbCcsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgb24gQmFzZScsIGxpbms6ICcvY2hhaW4vZGVwbG95LW9uLWJhc2UtcXVpY2tzdGFydCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOZXR3b3JrIEluZm9ybWF0aW9uJywgbGluazogJy9jaGFpbi9uZXR3b3JrLWluZm9ybWF0aW9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZlZXMnLCBsaW5rOiAnL2NoYWluL2ZlZXMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGlmZmVyZW5jZXMgQmV0d2VlbiBFdGhlcmV1bSBhbmQgQmFzZScsIGxpbms6ICcvY2hhaW4vZGlmZmVyZW5jZXMtYmV0d2Vlbi1ldGhlcmV1bS1hbmQtYmFzZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdSdW4gYSBCYXNlIE5vZGUnLCBsaW5rOiAnL2NoYWluL3J1bi1hLWJhc2Utbm9kZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCcmlkZ2UgYW4gTDEgVG9rZW4gdG8gQmFzZScsIGxpbms6ICcvY2hhaW4vYnJpZGdlLWFuLWwxLXRva2VuLXRvLWJhc2UnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQ29udHJhY3RzJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0Jhc2UgQ29udHJhY3RzJywgbGluazogJy9jaGFpbi9iYXNlLWNvbnRyYWN0cycgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdTZWN1cml0eScsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdTZWN1cml0eScsIGxpbms6ICcvY2hhaW4vc2VjdXJpdHknIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnT1AgU3RhY2snLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnRGVjZW50cmFsaXppbmcgQmFzZSB3aXRoIE9wdGltaXNtJywgbGluazogJy9jaGFpbi9kZWNlbnRyYWxpemluZy1iYXNlLXdpdGgtb3B0aW1pc20nIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnVG9vbHMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnT25jaGFpbiBSZWdpc3RyeSBBUEknLCBsaW5rOiAnL2NoYWluL3JlZ2lzdHJ5LWFwaScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOb2RlIFByb3ZpZGVycycsIGxpbms6ICcvY2hhaW4vbm9kZS1wcm92aWRlcnMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQmxvY2sgRXhwbG9yZXJzJywgbGluazogJy9jaGFpbi9ibG9jay1leHBsb3JlcnMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTmV0d29yayBGYXVjZXRzJywgbGluazogJy9jaGFpbi9uZXR3b3JrLWZhdWNldHMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT3JhY2xlcycsIGxpbms6ICcvY2hhaW4vb3JhY2xlcycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEYXRhIEluZGV4ZXJzJywgbGluazogJy9jaGFpbi9kYXRhLWluZGV4ZXJzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0Nyb3NzLWNoYWluJywgbGluazogJy9jaGFpbi9jcm9zcy1jaGFpbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdBY2NvdW50IEFic3RyYWN0aW9uJywgbGluazogJy9jaGFpbi9hY2NvdW50LWFic3RyYWN0aW9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ09ucmFtcHMnLCBsaW5rOiAnL2NoYWluL29ucmFtcHMnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnVXNlIENhc2VzJyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnT25ib2FyZCBhbnkgdXNlcicsXG4gICAgICAgIGxpbms6ICcvdXNlLWNhc2VzL29uYm9hcmQtYW55LXVzZXInLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0FjY2VwdCBjcnlwdG8gcGF5bWVudHMnLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9hY2NlcHQtY3J5cHRvLXBheW1lbnRzJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdMYXVuY2ggQUkgQWdlbnRzJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvbGF1bmNoLWFpLWFnZW50cycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnRGVjZW50cmFsaXplIHlvdXIgc29jaWFsIGFwcCcsXG4gICAgICAgIGxpbms6ICcvdXNlLWNhc2VzL2RlY2VudHJhbGl6ZS1zb2NpYWwtYXBwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdEZUZpIHlvdXIgYXBwJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvZGVmaS15b3VyLWFwcCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnR28gZ2FzbGVzcycsXG4gICAgICAgIGxpbms6ICcvdXNlLWNhc2VzL2dvLWdhc2xlc3MnLFxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIHRleHQ6ICdDb29rYm9vaycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1VzZSBDYXNlIEd1aWRlcycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSwgXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1BheW1lbnRzICYgQ29tbWVyY2UnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQWNjZXB0IENyeXB0byBQYXltZW50cycsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2NvbW1lcmNlL2FjY2VwdC1jcnlwdG8tcGF5bWVudHMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0J1aWxkIGFuIEUtY29tbWVyY2UgQXBwJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvY29tbWVyY2UvYnVpbGQtYW4tZWNvbW1lcmNlLWFwcCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IGEgU2hvcGlmeSBTdG9yZWZyb250JywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvY29tbWVyY2UvZGVwbG95LWEtc2hvcGlmeS1zdG9yZWZyb250JyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdUcmFuc2FjdGlvbiBHdWlkZScsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvYWN0aXZhdGluZy90cmFuc2FjdGlvbnMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ05GVHMgJiBEaWdpdGFsIEFzc2V0cycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdORlQgTWludGluZyB3aXRoIFpvcmEnLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9jcmVhdG9yL25mdC1taW50aW5nLXdpdGgtem9yYScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTm8tQ29kZSBORlQgTWludGluZycsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvYWN0aXZhdGluZy9uby1jb2RlLW1pbnRpbmcnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ05GVCBNaW50aW5nIEd1aWRlJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9hY3RpdmF0aW5nL25mdC1taW50aW5nJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdDb252ZXJ0IEZhcmNhc3RlciBGcmFtZSB0byBPcGVuIEZyYW1lJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvY3JlYXRvci9jb252ZXJ0LWZhcmNhc3Rlci1mcmFtZS10by1vcGVuLWZyYW1lJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdEZUZpICYgRmluYW5jaWFsIFRvb2xzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FkZCBJbi1BcHAgRnVuZGluZyAoT25yYW1wKScsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2ZpbmFuY2UvYnVpbGQtYS1zbWFydC13YWxsZXQtZnVuZGluZy1hcHAnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FjY2VzcyBSZWFsLVdvcmxkIERhdGEgKENoYWlubGluayknLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9maW5hbmNlL2FjY2Vzcy1yZWFsLXdvcmxkLWRhdGEtY2hhaW5saW5rJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdBY2Nlc3MgUmVhbC1UaW1lIEFzc2V0IERhdGEgKFB5dGgpJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvZmluYW5jZS9hY2Nlc3MtcmVhbC10aW1lLWFzc2V0LWRhdGEtcHl0aC1wcmljZS1mZWVkcycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnR3Jvd3RoICYgRGlzdHJpYnV0aW9uJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU29jaWFsICYgRGlzdHJpYnV0aW9uJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQ2FzdCBBY3Rpb25zJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9ncm93aW5nL2Nhc3QtYWN0aW9ucycgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0h5cGVyZnJhbWVzJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9ncm93aW5nL2h5cGVyZnJhbWVzJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRGVwbG95bWVudCAmIEFjY2VzcycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB0byBWZXJjZWwnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL2dyb3dpbmcvZGVwbG95LXRvLXZlcmNlbCcgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0dhdGluZyBhbmQgUmVkaXJlY3RzJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9ncm93aW5nL2dhdGluZy1hbmQtcmVkaXJlY3RzJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVXNlciBFbmdhZ2VtZW50JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRW1haWwgQ2FtcGFpZ25zJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9yZXRhaW5pbmcvY3JlYXRlLWVtYWlsLWNhbXBhaWducycgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dlbmVyYWwgRGV2ZWxvcG1lbnQnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1NtYXJ0IENvbnRyYWN0IERldmVsb3BtZW50JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSGFyZGhhdCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIEhhcmRoYXQnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9kZXBsb3ktd2l0aC1oYXJkaGF0JyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVidWdnaW5nIFNtYXJ0IENvbnRyYWN0cycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9oYXJkaGF0L2RlYnVnZ2luZy1zbWFydC1jb250cmFjdHMnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdPcHRpbWl6aW5nIEdhcyBVc2FnZScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9oYXJkaGF0L29wdGltaXppbmctZ2FzLXVzYWdlJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmVkdWNpbmcgQ29udHJhY3QgU2l6ZScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9oYXJkaGF0L3JlZHVjaW5nLWNvbnRyYWN0LXNpemUnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdBbmFseXppbmcgVGVzdCBDb3ZlcmFnZScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9oYXJkaGF0L2FuYWx5emluZy10ZXN0LWNvdmVyYWdlJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRm91bmRyeScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIEZvdW5kcnknLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvZm91bmRyeS9kZXBsb3ktd2l0aC1mb3VuZHJ5JyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnU2V0dXAgd2l0aCBCYXNlJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2ZvdW5kcnkvc2V0dXAtd2l0aC1iYXNlJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVGVzdGluZyBTbWFydCBDb250cmFjdHMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvZm91bmRyeS90ZXN0aW5nLXNtYXJ0LWNvbnRyYWN0cycgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlbWl4JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHdpdGggUmVtaXgnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvcmVtaXgvZGVwbG95LXdpdGgtcmVtaXgnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUZW5kZXJseScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIFRlbmRlcmx5JywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RlbmRlcmx5L2RlcGxveS13aXRoLXRlbmRlcmx5JyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGhpcmRXZWInLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgd2l0aCBUaGlyZFdlYicsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90aGlyZHdlYi9kZXBsb3ktd2l0aC10aGlyZHdlYicgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0J1aWxkIHdpdGggVGhpcmRXZWInLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvdGhpcmR3ZWIvYnVpbGQtd2l0aC10aGlyZHdlYicgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1RoaXJkV2ViIFNESycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90aGlyZHdlYi90aGlyZHdlYi1zZGsnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdUaGlyZFdlYiBDTEknLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvdGhpcmR3ZWIvdGhpcmR3ZWItY2xpJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ05GVHMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU2ltcGxlIE9uY2hhaW4gTkZUcycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9uZnRzL3NpbXBsZS1vbmNoYWluLW5mdHMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0R5bmFtaWMgTkZUcycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9uZnRzL2R5bmFtaWMtbmZ0cycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQ29tcGxleCBPbmNoYWluIE5GVHMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy9jb21wbGV4LW9uY2hhaW4tbmZ0cycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU2lnbmF0dXJlIE1pbnQnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy9zaWduYXR1cmUtbWludCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVGhpcmRXZWIgVW5yZWFsIE5GVCBJdGVtcycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9uZnRzL3RoaXJkd2ViLXVucmVhbC1uZnQtaXRlbXMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0lQRlMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHdpdGggRmxlZWsnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvaXBmcy9kZXBsb3ktd2l0aC1mbGVlaycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVG9rZW4gR2F0aW5nJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0dhdGUgSVJMIEV2ZW50cyB3aXRoIE5vdW5zJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3Rva2VuLWdhdGluZy9nYXRlLWlybC1ldmVudHMtd2l0aC1ub3VucycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ2xpZW50LVNpZGUgRGV2ZWxvcG1lbnQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnSW50cm9kdWN0aW9uIHRvIFByb3ZpZGVycycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9jbGllbnQtc2lkZS1kZXZlbG9wbWVudC9pbnRyb2R1Y3Rpb24tdG8tcHJvdmlkZXJzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdBY2NvdW50IEFic3RyYWN0aW9uJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1VzaW5nIEJpY29ub215JywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2FjY291bnQtYWJzdHJhY3Rpb24vYWNjb3VudC1hYnN0cmFjdGlvbi1vbi1iYXNlLXVzaW5nLWJpY29ub215JyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdVc2luZyBQYXJ0aWNsZSBOZXR3b3JrJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2FjY291bnQtYWJzdHJhY3Rpb24vYWNjb3VudC1hYnN0cmFjdGlvbi1vbi1iYXNlLXVzaW5nLXBhcnRpY2xlLW5ldHdvcmsnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1VzaW5nIFByaXZ5IGFuZCBCYXNlIFBheW1hc3RlcicsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9hY2NvdW50LWFic3RyYWN0aW9uL2FjY291bnQtYWJzdHJhY3Rpb24tb24tYmFzZS11c2luZy1wcml2eS1hbmQtdGhlLWJhc2UtcGF5bWFzdGVyJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdHYXNsZXNzIFRyYW5zYWN0aW9ucyB3aXRoIFBheW1hc3RlcicsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9hY2NvdW50LWFic3RyYWN0aW9uL2dhc2xlc3MtdHJhbnNhY3Rpb25zLXdpdGgtcGF5bWFzdGVyJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDcm9zcy1DaGFpbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdCcmlkZ2UgVG9rZW5zIHdpdGggTGF5ZXJaZXJvJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2Nyb3NzLWNoYWluL2JyaWRnZS10b2tlbnMtd2l0aC1sYXllcnplcm8nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1NlbmQgTWVzc2FnZXMgYW5kIFRva2VucyBmcm9tIEJhc2UgKENoYWlubGluayknLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvY3Jvc3MtY2hhaW4vc2VuZC1tZXNzYWdlcy1hbmQtdG9rZW5zLWNoYWlubGluaycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuICB7XG4gICAgdGV4dDogJ0ZlZWRiYWNrJyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnR2V0IGhlbHAgXHUyMTk3JyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZGlzY29yZC5jb20vaW52aXRlL2J1aWxkb25iYXNlJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdCdWcgYm91bnR5IFx1MjE5NycsXG4gICAgICAgIGxpbms6ICdodHRwczovL2hhY2tlcm9uZS5jb20vY29pbmJhc2UnXG4gICAgICB9XG4gICAgXVxuICB9XG5dIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9COzs7QUNLdEIsSUFBTSxVQUFtQjtBQUFBLEVBQzlCO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPLENBQUMsRUFBRSxNQUFNLG1CQUFtQixNQUFNLDBDQUEwQyxDQUFDO0FBQUEsVUFDdEY7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sV0FBVyxNQUFNLDhDQUE4QztBQUFBLGNBQ3ZFLEVBQUUsTUFBTSxRQUFRLE1BQU0sNENBQTRDO0FBQUEsY0FDbEUsRUFBRSxNQUFNLFNBQVMsTUFBTSw2Q0FBNkM7QUFBQSxjQUNwRSxFQUFFLE1BQU0sU0FBUyxNQUFNLDZDQUE2QztBQUFBLFlBQ3RFO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixXQUFXO0FBQUEsWUFDWCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0w7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxNQUFNO0FBQUEsb0JBQ04sTUFBTTtBQUFBLGtCQUNSO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixXQUFXO0FBQUEsWUFDWCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdC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
