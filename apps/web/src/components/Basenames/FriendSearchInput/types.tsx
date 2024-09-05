import { Chain } from 'viem';

export enum FriendSearchInputVariant {
  Small,
  Large,
}

export type FriendSearchInputProps = {
  variant: FriendSearchInputVariant;
  placeholder: string;
};

export type FriendSuggestionEntryProps = {
  suggestion: string;
  buttonClasses: string;
  handleSelectFriend: (name: string) => void;
  basenameChain: Chain;
  iconSize: number;
};
