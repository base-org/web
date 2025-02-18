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
    {
      text: "Get Help",
      link: "https://discord.com/invite/buildonbase?utm_source=dotorg&utm_medium=nav"
    },
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
    /* @__PURE__ */ jsx(
      "meta",
      {
        property: "og:description",
        content: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2"
      }
    ),
    /* @__PURE__ */ jsx("meta", { property: "twitter:title", content: "Base | Docs" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:image", content: "https://docs.base.org/img/base-open-graph.png" }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        property: "twitter:description",
        content: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2"
      }
    ),
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
      boost: { docType: { API: 2, Guide: 1.5 }, recencyScore: 2 },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHN4IiwgInNpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZvY3MnO1xuaW1wb3J0IHsgc2lkZWJhciB9IGZyb20gJy4vc2lkZWJhci50cyc7XG5pbXBvcnQgeyBNb2R1bGVLaW5kLCBNb2R1bGVSZXNvbHV0aW9uS2luZCB9IGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBiYXNlQ29uZmlnID0ge1xuICAvL2Jhc2VQYXRoOiBcImh0dHBzOi8vZG9jcy5iYXNlLm9yZy9kb2NzXCIsIC8vIENvbW1lbnQgb3V0IGluIGxvY2FsIGRldlxuICBiYXNlVXJsOiAnLycsXG4gIHRpdGxlOiAnQmFzZSBEb2NzJyxcbiAgZGVzY3JpcHRpb246XG4gICAgJ0V4cGxvcmUgdGhlIGRvY3VtZW50YXRpb24gZm9yIEJhc2UsIGEgc2VjdXJlLCBsb3ctY29zdCwgYnVpbGRlci1mcmllbmRseSBFdGhlcmV1bSBMMicsXG4gIGljb25Vcmw6IHtcbiAgICBsaWdodDogJ2ltZy9mYXZpY29uLmljbycsXG4gICAgZGFyazogJ2ltZy9mYXZpY29uLmljbycsXG4gIH0sXG4gIC8vIGxvZ29Vcmw6IHtcbiAgLy8gICAvLyBsaWdodDogLFxuICAvLyAgIC8vIGRhcms6ICxcbiAgLy8gfVxufTtcblxuLy8gdXNlZCBmb3IgZ2xvYmFsIGRpc21pc3NhYmxlIGFubm91bmNlbWVudHMsIGV0Y1xuY29uc3QgYmFubmVyQ29uZmlnID0ge1xuICAvLyBJZiB3ZSBkb24ndCBmb3JrIHZvY3MsIHRoZSBiYW5uZXIgY2FuIGJlIG92ZXJyaWRkZW4gYXMgc2VlbiBiZWxvdyB0byBhZGQgYSBoZWFkZXJcbiAgLy8gYmFubmVyOiB7XG4gIC8vICAgY29udGVudDogKFxuICAvLyAgICAgPGRpdiBjbGFzc05hbWU9XCJ2b2NzX2Jhbm5lcl9jb250ZW50XCI+XG4gIC8vICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVmdC1jb2x1bW5cIj5cbiAgLy8gICAgICAgICB7LyogT3B0aW9uYWw6IEFkZCBjb250ZW50IGhlcmUgaWYgbmVlZGVkIGluIHRoZSBmdXR1cmUgKi99XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlci1jb2x1bW5cIj5cbiAgLy8gICAgICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmlnYXRpb24tbGlua3NcIj5cbiAgLy8gICAgICAgICAgIDxhIGhyZWY9XCIvXCI+QVBJPC9hPlxuICAvLyAgICAgICAgICAgPGEgaHJlZj1cIi9kb2NzXCI+VG9vbHM8L2E+XG4gIC8vICAgICAgICAgICA8YSBocmVmPVwiL2Jsb2dcIj5CbG9nPC9hPlxuICAvLyAgICAgICAgICAgPGEgaHJlZj1cIi9jb21tdW5pdHlcIj5Db21tdW5pdHk8L2E+XG4gIC8vICAgICAgICAgPC9uYXY+XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWNvbHVtblwiPlxuICAvLyAgICAgICAgIDxidXR0b25cbiAgLy8gICAgICAgICAgIGNsYXNzTmFtZT1cImNvbm5lY3Qtd2FsbGV0LWJ1dHRvblwiXG4gIC8vICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gIC8vICAgICAgICAgICAgIC8vIEFkZCB5b3VyIHdhbGxldCBjb25uZWN0aW9uIGxvZ2ljIGhlcmVcbiAgLy8gICAgICAgICAgIH19XG4gIC8vICAgICAgICAgPlxuICAvLyAgICAgICAgICAgQ29ubmVjdCBXYWxsZXRcbiAgLy8gICAgICAgICA8L2J1dHRvbj5cbiAgLy8gICAgICAgPC9kaXY+XG4gIC8vICAgICA8L2Rpdj5cbiAgLy8gICApLFxuICAvLyAgIGhlaWdodDogJzk5cHgnLCAvLyBNdXN0IG1hdGNoIGhlaWdodCBpbiBDU1NcbiAgLy8gICBkaXNtaXNzYWJsZTogJ2ZhbHNlJywgLy8gTWFrZSBpdCBwZXJtYW5lbnRcbiAgLy8gICBiYWNrZ3JvdW5kQ29sb3I6ICcjMjMyMjI1JywgLy8gQ2hhcmNvYWwgY29sb3JcbiAgLy8gfVxufTtcblxuLy8gUmV1c2FibGUgbmF2IGxpbmsgc3R5bGVzIChpZiBub3QgdXNpbmcgVGFpbHdpbmQpXG5jb25zdCBuYXZMaW5rU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMnLFxuICAnOmhvdmVyJzogeyBvcGFjaXR5OiAwLjcgfSxcbn07XG5cbmNvbnN0IHR3b3NsYXNoQ29uZmlnID0ge1xuICB0d29zbGFzaDoge1xuICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgYWxsb3dVbWRHbG9iYWxBY2Nlc3M6IHRydWUsXG4gICAgICBlc01vZHVsZUludGVyb3A6IHRydWUsXG4gICAgICBtb2R1bGU6IE1vZHVsZUtpbmQuTm9kZU5leHQsIC8vTW9kdWxlS2luZC5QcmVzZXJ2ZVxuICAgICAgbW9kdWxlUmVzb2x1dGlvbjogTW9kdWxlUmVzb2x1dGlvbktpbmQuTm9kZU5leHQsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IHNpZGViYXJDb25maWcgPSB7XG4gIHNpZGViYXI6IHNpZGViYXIsXG59O1xuXG5jb25zdCB0b3BOYXZDb25maWcgPSB7XG4gIHRvcE5hdjogW1xuICAgIHtcbiAgICAgIHRleHQ6ICdHZXQgSGVscCcsXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9kaXNjb3JkLmNvbS9pbnZpdGUvYnVpbGRvbmJhc2U/dXRtX3NvdXJjZT1kb3RvcmcmdXRtX21lZGl1bT1uYXYnLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ2Jhc2Uub3JnJyxcbiAgICAgIGxpbms6ICdodHRwczovL2Jhc2Uub3JnJyxcbiAgICB9LFxuICBdLFxuICBsYXlvdXQ6ICdyaWdodCcsXG59O1xuXG5jb25zdCBtYXJrZG93bkNvbmZpZyA9IHtcbiAgY29kZToge1xuICAgIHRoZW1lczoge1xuICAgICAgbGlnaHQ6ICdnaXRodWItbGlnaHQnLFxuICAgICAgZGFyazogJ2dpdGh1Yi1kYXJrJyxcbiAgICB9LFxuICB9LFxufTtcblxuLy8gcGx1Z2lucyBmb3IgdHJhbnNmb3JtaW5nIG1hcmtkb3duOiBodHRwczovL2dpdGh1Yi5jb20vcmVtYXJranMvcmVtYXJrL2Jsb2IvbWFpbi9kb2MvcGx1Z2lucy5tZCNsaXN0LW9mLXBsdWdpbnNcbmNvbnN0IHBsdWdnYWJsZUNvbmZpZyA9IHtcbiAgbWFya2Rvd246IHtcbiAgICByZW1hcmtQbHVnaW5zOiBbXG4gICAgICAvLyBBZGQgeW91ciByZW1hcmsgcGx1Z2lucyBoZXJlXG4gICAgXSxcbiAgfSxcbn07XG5cbmNvbnN0IGJsb2dDb25maWcgPSB7XG4gIGJsb2dEaXI6ICcuL2Jsb2cnLFxufTtcblxuLy8gQ2FuIGRlZmluZSBwYXRoIG9iamVjdHMgd2hpY2ggcmV0dXJuIGRpZmZlcmVudCBtZXRhIHRhZ3MgZm9yIG1vcmUgY29udHJvbFxuY29uc3QgaGVhZENvbmZpZyA9IHtcbiAgaGVhZDogKFxuICAgIDw+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnR5cGVcIiBjb250ZW50PVwid2Vic2l0ZVwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cIkJhc2UgfCBEb2NzXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9kb2NzLmJhc2Uub3JnL2ltZy9iYXNlLW9wZW4tZ3JhcGgucG5nXCIgLz5cbiAgICAgIDxtZXRhXG4gICAgICAgIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIlxuICAgICAgICBjb250ZW50PVwiRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyXCJcbiAgICAgIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6dGl0bGVcIiBjb250ZW50PVwiQmFzZSB8IERvY3NcIiAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmltYWdlXCIgY29udGVudD1cImh0dHBzOi8vZG9jcy5iYXNlLm9yZy9pbWcvYmFzZS1vcGVuLWdyYXBoLnBuZ1wiIC8+XG4gICAgICA8bWV0YVxuICAgICAgICBwcm9wZXJ0eT1cInR3aXR0ZXI6ZGVzY3JpcHRpb25cIlxuICAgICAgICBjb250ZW50PVwiRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyXCJcbiAgICAgIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6Y2FyZFwiIGNvbnRlbnQ9XCJzdW1tYXJ5X2xhcmdlX2ltYWdlXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjpkb21haW5cIiBjb250ZW50PVwiYmFzZS5vcmdcIiAvPlxuICAgIDwvPlxuICApLFxufTtcblxuLy8gdm9jcyB1c2VzIE1pbmlTZWFyY2gsIGNoZWNrIGNvbmZpZ3NcbmNvbnN0IHNlYXJjaENvbmZpZyA9IHtcbiAgc2VhcmNoOiB7XG4gICAgZmllbGRzOiBbJ3RpdGxlJywgJ2NvbnRlbnQnLCAncHJvZHVjdExpbmUnLCAnZG9jVHlwZScsICd1c2VyVHlwZSddLCAvLyBGaWVsZHMgdG8gaW5kZXhcbiAgICBzdG9yZUZpZWxkczogWyd0aXRsZScsICdzbmlwcGV0JywgJ3Byb2R1Y3RMaW5lJywgJ2RvY1R5cGUnXSwgLy8gRmllbGRzIHRvIHJldHVybiBpbiByZXN1bHRzXG4gICAgc2VhcmNoT3B0aW9uczoge1xuICAgICAgcHJlZml4OiB0cnVlLCAvLyBBdXRvY29tcGxldGVcbiAgICAgIGZ1enp5OiAwLjIsIC8vIFR5cG8gdG9sZXJhbmNlXG4gICAgICBib29zdDogeyBkb2NUeXBlOiB7IEFQSTogMiwgR3VpZGU6IDEuNSB9LCByZWNlbmN5U2NvcmU6IDIgfSwgLy8gQm9vc3RpbmcgYnkgZG9jdW1lbnQgdHlwZSBhbmQgcmVjZW5jeVxuICAgICAgZmlsdGVyOiAoZG9jOiB7IHByb2R1Y3RMaW5lOiBzdHJpbmcgfSkgPT5cbiAgICAgICAgZG9jLnByb2R1Y3RMaW5lID09PSAnQmFzZSBQcm90b2NvbCcgfHwgZG9jLnByb2R1Y3RMaW5lID09PSAnT25jaGFpbktpdCcsIC8vIEZhY2V0ZWQgc2VhcmNoXG4gICAgICBoaWdobGlnaHQ6IHRydWUsIC8vIEluc3RhbnQgc2VhcmNoIHJlc3VsdCBwcmV2aWV3XG4gICAgICBsaW1pdDogMTAsIC8vIFBhZ2luYXRpb25cbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLi4uYmFzZUNvbmZpZyxcbiAgLi4uYmFubmVyQ29uZmlnLFxuICAuLi5zaWRlYmFyQ29uZmlnLFxuICAuLi50b3BOYXZDb25maWcsXG4gIC4uLmJsb2dDb25maWcsXG4gIC4uLmhlYWRDb25maWcsXG4gIC4uLm1hcmtkb3duQ29uZmlnLFxuICAuLi5wbHVnZ2FibGVDb25maWcsXG4gIC4uLnNlYXJjaENvbmZpZyxcbiAgLi4udHdvc2xhc2hDb25maWcsXG4gIHZpdGU6IHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcycpLFxuICAgICAgICAnQC9jb21wb25lbnRzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL2NvbXBvbmVudHMnKSxcbiAgICAgICAgJ0AvcGFnZXMnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MvcGFnZXMnKSxcbiAgICAgICAgJ0Avc3R5bGVzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3N0eWxlcycpLFxuICAgICAgICAnQC9saWInOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MvbGliJyksXG4gICAgICAgICdAL3V0aWxzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3V0aWxzJyksXG4gICAgICAgICdAL3R5cGVzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3R5cGVzJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2JyZW5kYW5fY2IvZGV2L29wZW5zb3VyY2UvYmFzZS93ZWIvYXBwcy9iYXNlLWRvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9icmVuZGFuX2NiL2Rldi9vcGVuc291cmNlL2Jhc2Uvd2ViL2FwcHMvYmFzZS1kb2NzL3NpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2JyZW5kYW5fY2IvZGV2L29wZW5zb3VyY2UvYmFzZS93ZWIvYXBwcy9iYXNlLWRvY3Mvc2lkZWJhci50c1wiO2ltcG9ydCB0eXBlIHsgU2lkZWJhciB9IGZyb20gJ3ZvY3MnXG5cbi8vIE5vdGU6IGNhcmVmdWwgb2YgbmFtZSBjbGFzaGluZyBiZXR3ZWVuIHNpZGViYXIgaXRlbXMgYW5kIGRvY3MgcGFnZXMuIFxuLy8gRm9yIGV4YW1wbGUsICdRdWlja3N0YXJ0JyBpcyB1c2VkIGZvciBib3RoIHNpZGViYXIgYW5kIHBhZ2UgbmFtZXMuXG4vLyBJZiBkb2NzIGFyZSBwYXJ0IG9mIGEgc2lkZWJhciBjb2xsZWN0aW9uLCB0aGV5IHNob3VsZCBiZSBpbiBhIHN1YmZvbGRlclxuZXhwb3J0IGNvbnN0IHNpZGViYXI6IFNpZGViYXIgPSBbXG4gIHtcbiAgICB0ZXh0OiAnT3ZlcnZpZXcnLFxuICAgIGxpbms6ICcvJyxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdRdWlja3N0YXJ0JyxcbiAgICBsaW5rOiAnL3F1aWNrc3RhcnQnLFxuICB9LFxuICB7XG4gICAgdGV4dDogJ0J1aWxkZXIgS2l0cycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ09uY2hhaW5LaXQnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbicsXG4gICAgICAgICAgICBpdGVtczogW3sgdGV4dDogJ0dldHRpbmcgU3RhcnRlZCcsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9nZXR0aW5nLXN0YXJ0ZWQnIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0luc3RhbGxhdGlvbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdOZXh0LmpzJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi9uZXh0anMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1ZpdGUnLCBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaW5zdGFsbGF0aW9uL3ZpdGUnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1JlbWl4JywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi9yZW1peCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQXN0cm8nLCBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaW5zdGFsbGF0aW9uL2FzdHJvJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDb25maWcnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdPbmNoYWluS2l0UHJvdmlkZXInLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9jb25maWcvb25jaGFpbmtpdC1wcm92aWRlcicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0NvbnRyaWJ1dGlvbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0hvdyB0byBDb250cmlidXRlJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZ3VpZGVzL2NvbnRyaWJ1dGlvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUmVwb3J0IGEgQnVnJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZ3VpZGVzL3JlcG9ydGluZy1idWcnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdHdWlkZXMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdMaWZlY3ljbGUgU3RhdHVzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZ3VpZGVzL2xpZmVjeWNsZS1zdGF0dXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RhaWx3aW5kIENTUyBJbnRlZ3JhdGlvbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy90YWlsd2luZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGhlbWUgQ3VzdG9taXphdGlvbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy90aGVtZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1VzZSBCYXNlbmFtZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy91c2UtYmFzZW5hbWUtaW4tb25jaGFpbi1hcHAnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdUZW1wbGF0ZXMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdPbmNoYWluIE5GVCBBcHAgXHUyMTk3JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9vY2stbWludC52ZXJjZWwuYXBwLycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbiBDb21tZXJjZSBBcHAgXHUyMTk3JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9vbmNoYWluLWNvbW1lcmNlLXRlbXBsYXRlLnZlcmNlbC5hcHAvJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdPbmNoYWluIFNvY2lhbCBQcm9maWxlIFx1MjE5NycsXG4gICAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWtlcGl4ZWxzL29jay1pZGVudGl0eScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0NvbXBvbmVudHMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDaGVja291dCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0NoZWNrb3V0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2NoZWNrb3V0L2NoZWNrb3V0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGcmFtZScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0ZyYW1lTWV0YWRhdGEnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZnJhbWUvZnJhbWUtbWV0YWRhdGEnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0Z1bmQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kQnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2Z1bmQvZnVuZC1idXR0b24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvaWRlbnRpdHknLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0FkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2F2YXRhcicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQmFkZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvYmFkZ2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0lkZW50aXR5Q2FyZCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9pZGVudGl0eS1jYXJkJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L25hbWUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1NvY2lhbHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvc29jaWFscycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTWludCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ05GVENhcmQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvbWludC9uZnQtY2FyZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTkZUTWludENhcmQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvbWludC9uZnQtbWludC1jYXJkJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9zd2FwL3N3YXAnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1N3YXBTZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9zd2FwL3N3YXAtc2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5DaGlwJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLWNoaXAnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuSW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvdG9rZW4vdG9rZW4taW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuUm93JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLXJvdycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5TZWFyY2gnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvdG9rZW4vdG9rZW4tc2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlblNlbGVjdERyb3Bkb3duJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLXNlbGVjdC1kcm9wZG93bicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90cmFuc2FjdGlvbi90cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3dhbGxldC93YWxsZXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duQmFzZW5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvd2FsbGV0L3dhbGxldC1kcm9wZG93bi1iYXNlbmFtZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0RHJvcGRvd25EaXNjb25uZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3dhbGxldC93YWxsZXQtZHJvcGRvd24tZGlzY29ubmVjdCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0RHJvcGRvd25GdW5kTGluaycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWZ1bmQtbGluaycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0RHJvcGRvd25MaW5rJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3dhbGxldC93YWxsZXQtZHJvcGRvd24tbGluaycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0FQSScsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRUb2tlbkRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2dldC10b2tlbi1kZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRNaW50RGV0YWlscycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LW1pbnQtZGV0YWlscycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnYnVpbGRNaW50VHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2J1aWxkLW1pbnQtdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1N3YXAnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdidWlsZFN3YXBUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9hcGkvYnVpbGQtc3dhcC10cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0U3dhcFF1b3RlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwaS9nZXQtc3dhcC1xdW90ZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW4nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRUb2tlbnMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2FwaS9nZXQtdG9rZW5zJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVXRpbGl0aWVzJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnaXNCYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9jb25maWcvaXMtYmFzZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnaXNFdGhlcmV1bScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY29uZmlnL2lzLWV0aGVyZXVtJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0T25yYW1wQnV5VXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mdW5kL2dldC1vbnJhbXAtYnV5LXVybCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRnJhbWUnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGYXJjYXN0ZXJVc2VyQWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZmFyY2FzdGVyL2dldC1mYXJjYXN0ZXItdXNlci1hZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGcmFtZUh0bWxSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZnJhbWUvZ2V0LWZyYW1lLWh0bWwtcmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldEZyYW1lTWVzc2FnZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZnJhbWUvZ2V0LWZyYW1lLW1lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldEZyYW1lTWV0YWRhdGEnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL2dldC1mcmFtZS1tZXRhZGF0YScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0WG10cEZyYW1lTWVzc2FnZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQveG10cC9nZXQteG10cC1mcmFtZS1tZXNzYWdlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdpc1htdHBGcmFtZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3htdHAvaXMteG10cC1mcmFtZS1yZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldEFkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1hZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRBdHRlc3RhdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1hdHRlc3RhdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldEF2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaWRlbnRpdHkvZ2V0LWF2YXRhcicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0TmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaWRlbnRpdHkvZ2V0LW5hbWUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3VzZUFkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3VzZS1hZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VBdmF0YXInLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3VzZS1hdmF0YXInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3VzZU5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3VzZS1uYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2Zvcm1hdEFtb3VudCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvdG9rZW4vZm9ybWF0LWFtb3VudCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnaXNWYWxpZEFBRW50cnlwb2ludCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvd2FsbGV0L2lzLXZhbGlkLWFhLWVudHJ5cG9pbnQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzV2FsbGV0QUNvaW5iYXNlU21hcnRXYWxsZXQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3dhbGxldC9pcy13YWxsZXQtYS1jb2luYmFzZS1zbWFydC13YWxsZXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdUeXBlcycsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0FQSScsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9hcGkvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NoZWNrb3V0JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2NoZWNrb3V0L3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb25maWcnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY29uZmlnL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGYXJjYXN0ZXInLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZmFyY2FzdGVyL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2Z1bmQvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0ZyYW1lJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTWludCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9taW50L3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3N3YXAvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3Rva2VuL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC90cmFuc2FjdGlvbi90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3dhbGxldC90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQWdlbnRLaXQgXHUyMTk3JyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZG9jcy5jZHAuY29pbmJhc2UuY29tL2FnZW50a2l0L2RvY3Mvd2VsY29tZScsXG4gICAgICB9LFxuICAgIF1cbiAgfSxcbiAge1xuICAgIHRleHQ6ICdCbG9ja3NwYWNlIFRvb2xzJyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnUGF5bWFzdGVyIFx1MjE5NycsXG4gICAgICAgIGxpbms6ICdodHRwczovL2RvY3MuY2RwLmNvaW5iYXNlLmNvbS9wYXltYXN0ZXIvZG9jcy93ZWxjb21lJyxcbiAgICAgIH0sXG4gICAgICAvLyB7IFBFTkRJTkcgQVBQQ0hBSU4gUkVMRUFTRSAyLzI1XG4gICAgICAvLyAgIHRleHQ6ICdBcHBjaGFpbnMgXHUyMTk3JyxcbiAgICAgIC8vICAgbGluazogJ2h0dHBzOi8vZG9jcy5jZHAuY29pbmJhc2UuY29tL3BheW1hc3Rlci9kb2NzL3dlbGNvbWUnLFxuICAgICAgLy8gfSxcbiAgICBdXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdTbWFydCBXYWxsZXQnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJJbnRyb2R1Y3Rpb25cIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJJbnN0YWxsIGZvciBXZWJcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvaW5zdGFsbC13ZWJcIiB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IFwiSW5zdGFsbCBmb3IgUmVhY3QgTmF0aXZlXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2luc3RhbGwtcmVhY3QtbmF0aXZlXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlJlY29tbWVuZCBMaWJyYXJpZXNcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvcmVjb21tZW5kZWQtbGlicmFyaWVzXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlN0YXJ0ZXIgVGVtcGxhdGVzXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L3N0YXJ0ZXItdGVtcGxhdGVzXCIgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgIFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiRmVhdHVyZXNcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkJ1aWx0LWluIEZlYXR1cmVzXCIsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJTaW5nbGUgU2lnbiBPblwiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9zaW5nbGUtc2lnbi1vblwiIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiTmV0d29ya3NcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvbmV0d29ya3NcIiB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlBhc3NrZXlzXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ZlYXR1cmVzL3Bhc3NrZXlzXCIgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJSZWNvdmVyeVwiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9yZWNvdmVyeS1rZXlzXCIgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJNYWdpY1NwZW5kXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ZlYXR1cmVzL21hZ2ljLXNwZW5kXCIgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJPcHRpb25hbCBGZWF0dXJlc1wiLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiR2FzLWZyZWUgVHJhbnNhY3Rpb25zXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ZlYXR1cmVzL3Nwb25zb3JlZC10cmFuc2FjdGlvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIk9uZS1jbGljayBUcmFuc2FjdGlvbnNcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvc3BlbmQtcGVybWlzc2lvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIkJhdGNoIFRyYW5zYWN0aW9uc1wiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9iYXRjaC1vcGVyYXRpb25zXCIgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJDdXN0b20gR2FzIFRva2Vuc1wiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9jdXN0b20tZ2FzLXRva2Vuc1wiIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkltcG9ydGFudCBEZXRhaWxzXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6IFwiU2lnbmF0dXJlIFZlcmlmaWNhdGlvblwiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9pbXBvcnRhbnQtZGV0YWlscy9zaWduYXR1cmUtdmVyaWZpY2F0aW9uXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlBvcHVwc1wiLCBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9pbXBvcnRhbnQtZGV0YWlscy9wb3B1cHNcIiB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IFwiU2ltdWxhdGlvbnNcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvaW1wb3J0YW50LWRldGFpbHMvc2ltdWxhdGlvbnNcIiB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IFwiUG9ydGFiaWxpdHlcIiwgbGluazogXCJpZGVudGl0eS9zbWFydC13YWxsZXQvaW1wb3J0YW50LWRldGFpbHMvcG9ydGFiaWxpdHlcIiB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IFwiR2FzIFVzYWdlXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ltcG9ydGFudC1kZXRhaWxzL2dhcy11c2FnZVwiIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJTZWxmIENhbGxzXCIsIGxpbms6IFwiaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ltcG9ydGFudC1kZXRhaWxzL3NlbGYtY2FsbHNcIiB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiU0RLXCIsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiY3JlYXRlQ29pbmJhc2VXYWxsZXRTREtcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcImlkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY3JlYXRlLWNvaW5iYXNlLXdhbGxldC1zZGtcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVHV0b3JpYWxzJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ3JlYXRlIGEgTmV3IFdlYiBBcHAnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdVc2luZyBPbmNoYWluIEFwcCBUZW1wbGF0ZScsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9jcmVhdGUtYXBwL3VzaW5nLW9uY2hhaW4tYXBwLXRlbXBsYXRlJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNpbmcgV2FnbWknLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvY3JlYXRlLWFwcC91c2luZy13YWdtaScgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdVcGRhdGUgRXhpc3RpbmcgQXBwJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3VwZGF0ZS1leGlzdGluZy1hcHAnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1JlYWN0IE5hdGl2ZSBJbnRlZ3JhdGlvbicsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9yZWFjdC1uYXRpdmUtaW50ZWdyYXRpb24nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0NyZWF0ZSBXYWxsZXQgQnV0dG9uJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2NvbXBvbmVudHMvY3JlYXRlLXdhbGxldC1idXR0b24nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1NpZ25hdHVyZSBWZXJpZmljYXRpb24nLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc2lnbmF0dXJlLXZlcmlmaWNhdGlvbicgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU0lXRScsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zaXdlJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdCYXRjaCBUcmFuc2FjdGlvbnMnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvYmF0Y2gtdHJhbnNhY3Rpb25zJyB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1NwZW5kIFBlcm1pc3Npb25zJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc3BlbmQtcGVybWlzc2lvbnMvb3ZlcnZpZXcnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdRdWljayBTdGFydCcsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9xdWljay1zdGFydCcgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0FQSSBSZWZlcmVuY2UnLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0NsaWVudCBSZXNvdXJjZXMnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc3BlbmQtcGVybWlzc2lvbnMvYXBpLXJlZmVyZW5jZS9jbGllbnQtcmVzb3VyY2VzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NwZW5kUGVybWlzc2lvbk1hbmFnZXInLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc3BlbmQtcGVybWlzc2lvbnMvYXBpLXJlZmVyZW5jZS9zcGVuZHBlcm1pc3Npb25tYW5hZ2VyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1dhbGxldCBGZXRjaFBlcm1pc3Npb25zJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2Uvd2FsbGV0LWZldGNocGVybWlzc2lvbnMnIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQmFzZW5hbWVzJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdUdXRvcmlhbHMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQmFzZW5hbWVzIFdhZ21pIFR1dG9yaWFsJywgbGluazogJy9pZGVudGl0eS9iYXNlbmFtZXMvYmFzZW5hbWVzLXdhZ21pLXR1dG9yaWFsJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdCYXNlbmFtZXMgT25jaGFpbktpdCBUdXRvcmlhbCcsIGxpbms6ICcvaWRlbnRpdHkvYmFzZW5hbWVzL2Jhc2VuYW1lcy1vbmNoYWlua2l0LXR1dG9yaWFsJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdGQVEgJiBUcm91Ymxlc2hvb3RpbmcnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQmFzZW5hbWVzIEZBUScsIGxpbms6ICcvaWRlbnRpdHkvYmFzZW5hbWVzL2Jhc2VuYW1lcy1mYXEnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnVmVyaWZpY2F0aW9ucycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnUXVpY2tzdGFydCcsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdRdWlja3N0YXJ0JywgbGluazogJy9pZGVudGl0eS92ZXJpZmljYXRpb25zL3F1aWNrc3RhcnQnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdXZWxjb21lJywgbGluazogJy9pZGVudGl0eS92ZXJpZmljYXRpb25zL3dlbGNvbWUnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1VzZSBDYXNlcycsIGxpbms6ICcvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy91c2UtY2FzZXMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0RvY3VtZW50YXRpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQXR0ZXN0YXRpb25zJywgbGluazogJy9pZGVudGl0eS92ZXJpZmljYXRpb25zL2F0dGVzdGF0aW9ucycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGQVEgJiBUcm91Ymxlc2hvb3RpbmcnLCBsaW5rOiAnL2lkZW50aXR5L3ZlcmlmaWNhdGlvbnMvZmFxLXRyb3VibGVzaG9vdGluZycgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnU3VwcG9ydCcsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdEaXNjb3JkIENvbW11bml0eScsIGxpbms6ICcvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy92ZXJpZmljYXRpb25zLWRpc2NvcmQnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnQ2hhaW4nLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHZW5lcmFsJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSBvbiBCYXNlJywgbGluazogJy9jaGFpbi9kZXBsb3ktb24tYmFzZS1xdWlja3N0YXJ0JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ05ldHdvcmsgSW5mb3JtYXRpb24nLCBsaW5rOiAnL2NoYWluL25ldHdvcmstaW5mb3JtYXRpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRmVlcycsIGxpbms6ICcvY2hhaW4vZmVlcycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEaWZmZXJlbmNlcyBCZXR3ZWVuIEV0aGVyZXVtIGFuZCBCYXNlJywgbGluazogJy9jaGFpbi9kaWZmZXJlbmNlcy1iZXR3ZWVuLWV0aGVyZXVtLWFuZC1iYXNlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1J1biBhIEJhc2UgTm9kZScsIGxpbms6ICcvY2hhaW4vcnVuLWEtYmFzZS1ub2RlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0JyaWRnZSBhbiBMMSBUb2tlbiB0byBCYXNlJywgbGluazogJy9jaGFpbi9icmlkZ2UtYW4tbDEtdG9rZW4tdG8tYmFzZScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdDb250cmFjdHMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQmFzZSBDb250cmFjdHMnLCBsaW5rOiAnL2NoYWluL2Jhc2UtY29udHJhY3RzJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1NlY3VyaXR5JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1NlY3VyaXR5JywgbGluazogJy9jaGFpbi9zZWN1cml0eScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdPUCBTdGFjaycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdEZWNlbnRyYWxpemluZyBCYXNlIHdpdGggT3B0aW1pc20nLCBsaW5rOiAnL2NoYWluL2RlY2VudHJhbGl6aW5nLWJhc2Utd2l0aC1vcHRpbWlzbScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdUb29scycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdPbmNoYWluIFJlZ2lzdHJ5IEFQSScsIGxpbms6ICcvY2hhaW4vcmVnaXN0cnktYXBpJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ05vZGUgUHJvdmlkZXJzJywgbGluazogJy9jaGFpbi9ub2RlLXByb3ZpZGVycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCbG9jayBFeHBsb3JlcnMnLCBsaW5rOiAnL2NoYWluL2Jsb2NrLWV4cGxvcmVycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOZXR3b3JrIEZhdWNldHMnLCBsaW5rOiAnL2NoYWluL25ldHdvcmstZmF1Y2V0cycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPcmFjbGVzJywgbGluazogJy9jaGFpbi9vcmFjbGVzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RhdGEgSW5kZXhlcnMnLCBsaW5rOiAnL2NoYWluL2RhdGEtaW5kZXhlcnMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ3Jvc3MtY2hhaW4nLCBsaW5rOiAnL2NoYWluL2Nyb3NzLWNoYWluJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0FjY291bnQgQWJzdHJhY3Rpb24nLCBsaW5rOiAnL2NoYWluL2FjY291bnQtYWJzdHJhY3Rpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT25yYW1wcycsIGxpbms6ICcvY2hhaW4vb25yYW1wcycgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdVc2UgQ2FzZXMnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdPbmJvYXJkIGFueSB1c2VyJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvb25ib2FyZC1hbnktdXNlcicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQWNjZXB0IGNyeXB0byBwYXltZW50cycsXG4gICAgICAgIGxpbms6ICcvdXNlLWNhc2VzL2FjY2VwdC1jcnlwdG8tcGF5bWVudHMnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0xhdW5jaCBBSSBBZ2VudHMnLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9sYXVuY2gtYWktYWdlbnRzJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdEZWNlbnRyYWxpemUgeW91ciBzb2NpYWwgYXBwJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvZGVjZW50cmFsaXplLXNvY2lhbC1hcHAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0RlRmkgeW91ciBhcHAnLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9kZWZpLXlvdXItYXBwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHbyBnYXNsZXNzJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvZ28tZ2FzbGVzcycsXG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgdGV4dDogJ0Nvb2tib29rJyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnVXNlIENhc2UgR3VpZGVzJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLCBcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnUGF5bWVudHMgJiBDb21tZXJjZScsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdBY2NlcHQgQ3J5cHRvIFBheW1lbnRzJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvY29tbWVyY2UvYWNjZXB0LWNyeXB0by1wYXltZW50cycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQnVpbGQgYW4gRS1jb21tZXJjZSBBcHAnLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9jb21tZXJjZS9idWlsZC1hbi1lY29tbWVyY2UtYXBwJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgYSBTaG9waWZ5IFN0b3JlZnJvbnQnLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9jb21tZXJjZS9kZXBsb3ktYS1zaG9waWZ5LXN0b3JlZnJvbnQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1RyYW5zYWN0aW9uIEd1aWRlJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9hY3RpdmF0aW5nL3RyYW5zYWN0aW9ucycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnTkZUcyAmIERpZ2l0YWwgQXNzZXRzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ05GVCBNaW50aW5nIHdpdGggWm9yYScsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2NyZWF0b3IvbmZ0LW1pbnRpbmctd2l0aC16b3JhJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdOby1Db2RlIE5GVCBNaW50aW5nJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9hY3RpdmF0aW5nL25vLWNvZGUtbWludGluZycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTkZUIE1pbnRpbmcgR3VpZGUnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL2FjdGl2YXRpbmcvbmZ0LW1pbnRpbmcnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0NvbnZlcnQgRmFyY2FzdGVyIEZyYW1lIHRvIE9wZW4gRnJhbWUnLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9jcmVhdG9yL2NvbnZlcnQtZmFyY2FzdGVyLWZyYW1lLXRvLW9wZW4tZnJhbWUnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0RlRmkgJiBGaW5hbmNpYWwgVG9vbHMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQWRkIEluLUFwcCBGdW5kaW5nIChPbnJhbXApJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvZmluYW5jZS9idWlsZC1hLXNtYXJ0LXdhbGxldC1mdW5kaW5nLWFwcCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQWNjZXNzIFJlYWwtV29ybGQgRGF0YSAoQ2hhaW5saW5rKScsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2ZpbmFuY2UvYWNjZXNzLXJlYWwtd29ybGQtZGF0YS1jaGFpbmxpbmsnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FjY2VzcyBSZWFsLVRpbWUgQXNzZXQgRGF0YSAoUHl0aCknLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9maW5hbmNlL2FjY2Vzcy1yZWFsLXRpbWUtYXNzZXQtZGF0YS1weXRoLXByaWNlLWZlZWRzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdHcm93dGggJiBEaXN0cmlidXRpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTb2NpYWwgJiBEaXN0cmlidXRpb24nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdDYXN0IEFjdGlvbnMnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL2dyb3dpbmcvY2FzdC1hY3Rpb25zJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnSHlwZXJmcmFtZXMnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL2dyb3dpbmcvaHlwZXJmcmFtZXMnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdEZXBsb3ltZW50ICYgQWNjZXNzJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHRvIFZlcmNlbCcsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvZ3Jvd2luZy9kZXBsb3ktdG8tdmVyY2VsJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnR2F0aW5nIGFuZCBSZWRpcmVjdHMnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL2dyb3dpbmcvZ2F0aW5nLWFuZC1yZWRpcmVjdHMnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdVc2VyIEVuZ2FnZW1lbnQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdFbWFpbCBDYW1wYWlnbnMnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL3JldGFpbmluZy9jcmVhdGUtZW1haWwtY2FtcGFpZ25zJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnR2VuZXJhbCBEZXZlbG9wbWVudCcsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnU21hcnQgQ29udHJhY3QgRGV2ZWxvcG1lbnQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdIYXJkaGF0JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHdpdGggSGFyZGhhdCcsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9oYXJkaGF0L2RlcGxveS13aXRoLWhhcmRoYXQnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZWJ1Z2dpbmcgU21hcnQgQ29udHJhY3RzJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvZGVidWdnaW5nLXNtYXJ0LWNvbnRyYWN0cycgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ09wdGltaXppbmcgR2FzIFVzYWdlJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvb3B0aW1pemluZy1nYXMtdXNhZ2UnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdSZWR1Y2luZyBDb250cmFjdCBTaXplJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvcmVkdWNpbmctY29udHJhY3Qtc2l6ZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0FuYWx5emluZyBUZXN0IENvdmVyYWdlJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvYW5hbHl6aW5nLXRlc3QtY292ZXJhZ2UnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGb3VuZHJ5JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHdpdGggRm91bmRyeScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9mb3VuZHJ5L2RlcGxveS13aXRoLWZvdW5kcnknIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdTZXR1cCB3aXRoIEJhc2UnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvZm91bmRyeS9zZXR1cC13aXRoLWJhc2UnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdUZXN0aW5nIFNtYXJ0IENvbnRyYWN0cycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9mb3VuZHJ5L3Rlc3Rpbmctc21hcnQtY29udHJhY3RzJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUmVtaXgnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgd2l0aCBSZW1peCcsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9yZW1peC9kZXBsb3ktd2l0aC1yZW1peCcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RlbmRlcmx5JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHdpdGggVGVuZGVybHknLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvdGVuZGVybHkvZGVwbG95LXdpdGgtdGVuZGVybHknIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUaGlyZFdlYicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIFRoaXJkV2ViJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL2RlcGxveS13aXRoLXRoaXJkd2ViJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQnVpbGQgd2l0aCBUaGlyZFdlYicsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90aGlyZHdlYi9idWlsZC13aXRoLXRoaXJkd2ViJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVGhpcmRXZWIgU0RLJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL3RoaXJkd2ViLXNkaycgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1RoaXJkV2ViIENMSScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90aGlyZHdlYi90aGlyZHdlYi1jbGknIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnTkZUcycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdTaW1wbGUgT25jaGFpbiBORlRzJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L25mdHMvc2ltcGxlLW9uY2hhaW4tbmZ0cycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRHluYW1pYyBORlRzJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L25mdHMvZHluYW1pYy1uZnRzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdDb21wbGV4IE9uY2hhaW4gTkZUcycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9uZnRzL2NvbXBsZXgtb25jaGFpbi1uZnRzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTaWduYXR1cmUgTWludCcsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9uZnRzL3NpZ25hdHVyZS1taW50JyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdUaGlyZFdlYiBVbnJlYWwgTkZUIEl0ZW1zJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L25mdHMvdGhpcmR3ZWItdW5yZWFsLW5mdC1pdGVtcycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnSVBGUycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgd2l0aCBGbGVlaycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9pcGZzL2RlcGxveS13aXRoLWZsZWVrJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdUb2tlbiBHYXRpbmcnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnR2F0ZSBJUkwgRXZlbnRzIHdpdGggTm91bnMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvdG9rZW4tZ2F0aW5nL2dhdGUtaXJsLWV2ZW50cy13aXRoLW5vdW5zJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDbGllbnQtU2lkZSBEZXZlbG9wbWVudCcsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdJbnRyb2R1Y3Rpb24gdG8gUHJvdmlkZXJzJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2NsaWVudC1zaWRlLWRldmVsb3BtZW50L2ludHJvZHVjdGlvbi10by1wcm92aWRlcnMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0FjY291bnQgQWJzdHJhY3Rpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNpbmcgQmljb25vbXknLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvYWNjb3VudC1hYnN0cmFjdGlvbi9hY2NvdW50LWFic3RyYWN0aW9uLW9uLWJhc2UtdXNpbmctYmljb25vbXknIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1VzaW5nIFBhcnRpY2xlIE5ldHdvcmsnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvYWNjb3VudC1hYnN0cmFjdGlvbi9hY2NvdW50LWFic3RyYWN0aW9uLW9uLWJhc2UtdXNpbmctcGFydGljbGUtbmV0d29yaycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNpbmcgUHJpdnkgYW5kIEJhc2UgUGF5bWFzdGVyJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2FjY291bnQtYWJzdHJhY3Rpb24vYWNjb3VudC1hYnN0cmFjdGlvbi1vbi1iYXNlLXVzaW5nLXByaXZ5LWFuZC10aGUtYmFzZS1wYXltYXN0ZXInIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0dhc2xlc3MgVHJhbnNhY3Rpb25zIHdpdGggUGF5bWFzdGVyJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2FjY291bnQtYWJzdHJhY3Rpb24vZ2FzbGVzcy10cmFuc2FjdGlvbnMtd2l0aC1wYXltYXN0ZXInIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0Nyb3NzLUNoYWluJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0JyaWRnZSBUb2tlbnMgd2l0aCBMYXllclplcm8nLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvY3Jvc3MtY2hhaW4vYnJpZGdlLXRva2Vucy13aXRoLWxheWVyemVybycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU2VuZCBNZXNzYWdlcyBhbmQgVG9rZW5zIGZyb20gQmFzZSAoQ2hhaW5saW5rKScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9jcm9zcy1jaGFpbi9zZW5kLW1lc3NhZ2VzLWFuZC10b2tlbnMtY2hhaW5saW5rJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnRmVlZGJhY2snLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHZXQgaGVscCBcdTIxOTcnLFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kaXNjb3JkLmNvbS9pbnZpdGUvYnVpbGRvbmJhc2UnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0J1ZyBib3VudHkgXHUyMTk3JyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vaGFja2Vyb25lLmNvbS9jb2luYmFzZSdcbiAgICAgIH1cbiAgICBdXG4gIH1cbl0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7OztBQ0t0QixJQUFNLFVBQW1CO0FBQUEsRUFDOUI7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU8sQ0FBQyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMENBQTBDLENBQUM7QUFBQSxVQUN0RjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMLEVBQUUsTUFBTSxXQUFXLE1BQU0sOENBQThDO0FBQUEsY0FDdkUsRUFBRSxNQUFNLFFBQVEsTUFBTSw0Q0FBNEM7QUFBQSxjQUNsRSxFQUFFLE1BQU0sU0FBUyxNQUFNLDZDQUE2QztBQUFBLGNBQ3BFLEVBQUUsTUFBTSxTQUFTLE1BQU0sNkNBQTZDO0FBQUEsWUFDdEU7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFdBQVc7QUFBQSxZQUNYLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFdBQVc7QUFBQSxZQUNYLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07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
