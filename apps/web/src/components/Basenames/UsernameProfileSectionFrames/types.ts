import type { FarcasterFrameContext } from '@frames.js/render';
import type {
  Frame,
  FrameButton,
  FrameButtonLink,
  FrameButtonPost,
  FrameButtonTx,
  SupportedParsingSpecification,
  TransactionTargetResponseSendTransaction,
  TransactionTargetResponseSignTypedDataV4,
  getFrame,
} from 'frames.js';
import type { ParseResult } from 'frames.js/frame-parsers';
import type {
  CastActionResponse,
  ComposerActionFormResponse,
  ComposerActionState,
} from 'frames.js/types';
import type { Dispatch } from 'react';

export type OnTransactionArgs = {
  transactionData: TransactionTargetResponseSendTransaction;
  frameButton: FrameButton;
  frame: Frame;
};

export type OnTransactionFunc = (arg: OnTransactionArgs) => Promise<`0x${string}` | null>;

export type OnSignatureArgs = {
  signatureData: TransactionTargetResponseSignTypedDataV4;
  frameButton: FrameButton;
  frame: Frame;
};

export type OnSignatureFunc = (args: OnSignatureArgs) => Promise<`0x${string}` | null>;

type OnComposerFormActionFuncArgs = {
  form: ComposerActionFormResponse;
  cast: ComposerActionState;
};

export type OnComposeFormActionFuncReturnType =
  | {
      /**
       * Updated composer action state
       */
      composerActionState: ComposerActionState;
    }
  | undefined;

/**
 * If the function resolves to undefined it means that the dialog was probably closed resulting in no operation at all.
 */
export type OnComposerFormActionFunc = (
  arg: OnComposerFormActionFuncArgs,
) => Promise<OnComposeFormActionFuncReturnType>;

/**
 * Called when user presses transaction button but there is no wallet connected.
 *
 * After wallet is connect, "connectAddress" option on useFrame() should be set to the connected address.
 */
export type OnConnectWalletFunc = () => void;

/**
 * Used to sign frame action
 */
export type SignFrameActionFunc<
  TSignerStorageType = Record<string, unknown>,
  TFrameActionBodyType extends FrameActionBodyPayload = FrameActionBodyPayload,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = (
  actionContext: SignerStateActionContext<TSignerStorageType, TFrameContextType>,
) => Promise<SignedFrameAction<TFrameActionBodyType>>;

export type UseFetchFrameSignFrameActionFunction<
  TSignerStateActionContext extends SignerStateActionContext<unknown, Record<string, unknown>>,
  TFrameActionBodyType extends FrameActionBodyPayload = FrameActionBodyPayload,
> = (arg: {
  actionContext: TSignerStateActionContext;
  /**
   * @defaultValue false
   */
  forceRealSigner?: boolean;
}) => Promise<SignedFrameAction<TFrameActionBodyType>>;

export type UseFrameOptions<
  TSignerStorageType = Record<string, unknown>,
  TFrameActionBodyType extends FrameActionBodyPayload = FrameActionBodyPayload,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = {
  /** skip frame signing, for frames that don't verify signatures */
  dangerousSkipSigning?: boolean;
  /** the route used to POST frame actions. The post_url will be added as a the `url` query parameter */
  frameActionProxy: string;
  /** the route used to GET the initial frame via proxy */
  frameGetProxy: string;
  /** an signer state object used to determine what actions are possible */
  signerState: SignerStateInstance<TSignerStorageType, TFrameActionBodyType, TFrameContextType>;
  /** the url of the homeframe, if null / undefined won't load a frame */
  homeframeUrl: string | null | undefined;
  /** the initial frame. if not specified will fetch it from the homeframeUrl prop */
  frame?: Frame | ParseResult;
  /**
   * connected wallet address of the user, send to the frame for transaction requests
   */
  connectedAddress: `0x${string}` | undefined;
  /** a function to handle mint buttons */
  onMint?: (t: OnMintArgs) => void;
  /** a function to handle transaction buttons that returned transaction data from the target, returns the transaction hash or null */
  onTransaction?: OnTransactionFunc;
  /** Transaction data suffix */
  transactionDataSuffix?: `0x${string}`;
  /** A function to handle transaction buttons that returned signature data from the target, returns signature hash or null */
  onSignature?: OnSignatureFunc;
  /**
   * Called when user presses transaction button but there is no wallet connected.
   */
  onConnectWallet?: OnConnectWalletFunc;
  /** the context of this frame, used for generating Frame Action payloads */
  frameContext: TFrameContextType;
  /**
   * Extra data appended to the frame action payload
   */
  extraButtonRequestPayload?: Record<string, unknown>;
  /**
   * Which specification to use for parsing the frame action payload
   *
   * @defaultValue 'farcaster'
   */
  specification?: SupportedParsingSpecification;
  /**
   * This function can be used to customize how error is reported to the user.
   */
  onError?: (error: Error) => void;
  /**
   * This function can be used to customize how the link button click is handled.
   */
  onLinkButtonClick?: (button: FrameButtonLink) => void;
};

type SignerStateActionSharedContext<
  TSignerStorageType = Record<string, unknown>,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = {
  target?: string;
  frameButton: FrameButton;
  buttonIndex: number;
  url: string;
  inputText?: string;
  signer: TSignerStorageType | null;
  state?: string;
  transactionId?: `0x${string}`;
  address?: `0x${string}`;
  /** Transacting address is not included in non-transaction frame actions */
  frameContext: TFrameContextType;
};

export type SignerStateDefaultActionContext<
  TSignerStorageType = Record<string, unknown>,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = {
  type?: 'default';
} & SignerStateActionSharedContext<TSignerStorageType, TFrameContextType>;

export type SignerStateTransactionDataActionContext<
  TSignerStorageType = Record<string, unknown>,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = {
  type: 'tx-data';
  /** Wallet address used to create the transaction, available only for "tx" button actions */
  address: `0x${string}`;
} & SignerStateActionSharedContext<TSignerStorageType, TFrameContextType>;

export type SignerStateTransactionPostActionContext<
  TSignerStorageType = Record<string, unknown>,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = {
  type: 'tx-post';
  /** Wallet address used to create the transaction, available only for "tx" button actions */
  address: `0x${string}`;
  transactionId: `0x${string}`;
} & SignerStateActionSharedContext<TSignerStorageType, TFrameContextType>;

export type SignerStateActionContext<
  TSignerStorageType = Record<string, unknown>,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> =
  | SignerStateDefaultActionContext<TSignerStorageType, TFrameContextType>
  | SignerStateTransactionDataActionContext<TSignerStorageType, TFrameContextType>
  | SignerStateTransactionPostActionContext<TSignerStorageType, TFrameContextType>;

export type SignedFrameAction<
  TFrameActionBodyType extends FrameActionBodyPayload = FrameActionBodyPayload,
> = {
  body: TFrameActionBodyType;
  searchParams: URLSearchParams;
};

export type SignFrameActionFunction<
  TSignerStateActionContext extends SignerStateActionContext<
    unknown,
    Record<string, unknown>
  > = SignerStateActionContext,
  TFrameActionBodyType extends FrameActionBodyPayload = FrameActionBodyPayload,
> = (actionContext: TSignerStateActionContext) => Promise<SignedFrameAction<TFrameActionBodyType>>;

export type SignerStateInstance<
  TSignerStorageType = Record<string, unknown>,
  TFrameActionBodyType extends FrameActionBodyPayload = FrameActionBodyPayload,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = {
  signer: TSignerStorageType | null;
  /**
   * True only if signer is approved or impersonating
   */
  hasSigner: boolean;
  signFrameAction: SignFrameActionFunction<
    SignerStateActionContext<TSignerStorageType, TFrameContextType>,
    TFrameActionBodyType
  >;
  /** is loading the signer */
  isLoadingSigner: boolean;
  /** A function called when a frame button is clicked without a signer */
  onSignerlessFramePress: () => Promise<void>;
  logout: () => Promise<void>;
};

export type FrameGETRequest = {
  method: 'GET';
  url: string;
};

export type FramePOSTRequest<
  TSignerStateActionContext extends SignerStateActionContext<
    unknown,
    Record<string, unknown>
  > = SignerStateActionContext,
> =
  | {
      method: 'POST';
      source?: never;
      frameButton: FrameButtonPost | FrameButtonTx;
      signerStateActionContext: TSignerStateActionContext;
      isDangerousSkipSigning: boolean;
      /**
       * The frame that was the source of the button press.
       */
      sourceFrame: Frame;
    }
  | {
      method: 'POST';
      source: 'cast-action' | 'composer-action';
      frameButton: FrameButtonPost | FrameButtonTx;
      signerStateActionContext: TSignerStateActionContext;
      isDangerousSkipSigning: boolean;
      sourceFrame: undefined;
    };

export type FrameRequest<
  TSignerStateActionContext extends SignerStateActionContext<
    unknown,
    Record<string, unknown>
  > = SignerStateActionContext,
> = FrameGETRequest | FramePOSTRequest<TSignerStateActionContext>;

export type FrameStackBase = {
  timestamp: Date;
  /** speed in seconds */
  speed: number;
  responseStatus: number;
  responseBody: unknown;
  requestDetails: {
    body?: object;
    searchParams?: URLSearchParams;
  };
  url: string;
};

export type FrameStackPostPending = {
  method: 'POST';
  timestamp: Date;
  status: 'pending';
  request: FramePOSTRequest;
  requestDetails: {
    body?: object;
    searchParams?: URLSearchParams;
  };
  url: string;
};

export type FrameStackGetPending = {
  method: 'GET';
  timestamp: Date;
  status: 'pending';
  request: FrameGETRequest;
  requestDetails: {
    body?: object;
    searchParams?: URLSearchParams;
  };
  url: string;
};

export type FrameStackPending = FrameStackGetPending | FrameStackPostPending;

export type GetFrameResult = ReturnType<typeof getFrame>;

export type FrameStackDone = FrameStackBase & {
  request: FrameRequest;
  response: Response;
  frameResult: GetFrameResult;
  status: 'done';
};

export type FrameStackDoneRedirect = FrameStackBase & {
  request: FramePOSTRequest;
  response: Response;
  location: string;
  status: 'doneRedirect';
};

export type FrameStackRequestError = FrameStackBase & {
  request: FrameRequest;
  response: Response | null;
  status: 'requestError';
  requestError: Error;
};

export type FrameStackMessage = FrameStackBase & {
  request: FramePOSTRequest;
  response: Response;
  status: 'message';
  message: string;
  type: 'info' | 'error';
};

export type FramesStackItem =
  | FrameStackPending
  | FrameStackDone
  | FrameStackDoneRedirect
  | FrameStackRequestError
  | FrameStackMessage;

export type FramesStack = FramesStackItem[];

export type FrameReducerActions =
  | {
      action: 'LOAD';
      item: FrameStackPending;
    }
  | {
      action: 'REQUEST_ERROR';
      pendingItem: FrameStackPending;
      item: FrameStackRequestError;
    }
  | {
      action: 'DONE_REDIRECT';
      pendingItem: FrameStackPending;
      item: FrameStackDoneRedirect;
    }
  | {
      action: 'DONE';
      pendingItem: FrameStackPending;
      item: FramesStackItem;
    }
  | { action: 'CLEAR' }
  | {
      action: 'RESET_INITIAL_FRAME';
      resultOrFrame: ParseResult | Frame;
      homeframeUrl: string | null | undefined;
    };

type ButtonPressFunction<
  TSignerStateActionContext extends SignerStateActionContext<unknown, Record<string, unknown>>,
> = (
  frame: Frame,
  frameButton: FrameButton,
  index: number,
  fetchFrameOverride?: FetchFrameFunction<TSignerStateActionContext>,
) => void | Promise<void>;

type CastActionButtonPressFunctionArg = {
  castAction: CastActionResponse & {
    /** URL to cast action handler */
    url: string;
  };
  /**
   * @defaultValue false
   */
  clearStack?: boolean;
};

export type CastActionButtonPressFunction = (
  arg: CastActionButtonPressFunctionArg,
) => Promise<void>;

type ComposerActionButtonPressFunctionArg = {
  castAction: CastActionResponse & {
    /** URL to cast action handler */
    url: string;
  };
  composerActionState: ComposerActionState;
  /**
   * @defaultValue false
   */
  clearStack?: boolean;
};

export type ComposerActionButtonPressFunction = (
  arg: ComposerActionButtonPressFunctionArg,
) => Promise<void>;

export type CastActionRequest<
  TSignerStateActionContext extends SignerStateActionContext<
    unknown,
    Record<string, unknown>
  > = SignerStateActionContext,
> = Omit<
  FramePOSTRequest,
  'method' | 'frameButton' | 'sourceFrame' | 'signerStateActionContext'
> & {
  method: 'CAST_ACTION';
  action: CastActionResponse & {
    url: string;
  };
  signerStateActionContext: Omit<
    FramePOSTRequest<TSignerStateActionContext>['signerStateActionContext'],
    'frameButton' | 'inputText' | 'state'
  >;
};

export type ComposerActionRequest<
  TSignerStateActionContext extends SignerStateActionContext<
    unknown,
    Record<string, unknown>
  > = SignerStateActionContext,
> = Omit<
  FramePOSTRequest,
  'method' | 'frameButton' | 'sourceFrame' | 'signerStateActionContext'
> & {
  method: 'COMPOSER_ACTION';
  action: CastActionResponse & {
    url: string;
  };
  composerActionState: ComposerActionState;
  signerStateActionContext: Omit<
    FramePOSTRequest<TSignerStateActionContext>['signerStateActionContext'],
    'frameButton' | 'inputText' | 'state'
  >;
};

export type FetchFrameFunction<
  TSignerStateActionContext extends SignerStateActionContext<
    unknown,
    Record<string, unknown>
  > = SignerStateActionContext,
> = (
  request:
    | FrameRequest<TSignerStateActionContext>
    | CastActionRequest<TSignerStateActionContext>
    | ComposerActionRequest<TSignerStateActionContext>,
  /**
   * If true, the frame stack will be cleared before the new frame is loaded
   *
   * @defaultValue false
   */
  shouldClear?: boolean,
) => Promise<void>;

export type FrameState<
  TSignerStorageType = Record<string, unknown>,
  TFrameContextType extends FrameContext = FarcasterFrameContext,
> = {
  fetchFrame: FetchFrameFunction<SignerStateActionContext<TSignerStorageType, TFrameContextType>>;
  clearFrameStack: () => void;
  dispatchFrameStack: Dispatch<FrameReducerActions>;
  /** The frame at the top of the stack (at index 0) */
  currentFrameStackItem: FramesStackItem | undefined;
  /** A stack of frames with additional context, with the most recent frame at index 0 */
  framesStack: FramesStack;
  inputText: string;
  setInputText: (s: string) => void;
  onButtonPress: ButtonPressFunction<
    SignerStateActionContext<TSignerStorageType, TFrameContextType>
  >;
  homeframeUrl: string | null | undefined;
  onCastActionButtonPress: CastActionButtonPressFunction;
  onComposerActionButtonPress: ComposerActionButtonPressFunction;
};

export type FarcasterCreateSignerResult = {
  token: string;
  signerApprovalUrl: string;
};

export type OnMintArgs = {
  target: string;
  frameButton: FrameButton;
  frame: Frame;
};

export const themeParams = [
  'bg',
  'buttonColor',
  'buttonBg',
  'buttonBorderColor',
  'buttonRadius',
  'buttonHoverBg',
] as const;

export type FrameTheme = Partial<Record<(typeof themeParams)[number], string>>;

export type FrameActionBodyPayload = Record<string, unknown>;

export type FrameContext = Record<string, unknown>;
