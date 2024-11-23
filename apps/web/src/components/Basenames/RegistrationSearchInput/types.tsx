import { Chain } from 'viem';

export enum RegistrationSearchInputVariant {
  Small,
  Large,
}
export type RegistrationSearchInputProps = {
  variant: RegistrationSearchInputVariant;
  placeholder: string;
};
export type SuggestionEntryProps = {
  suggestion: string;
  buttonClasses: string;
  handleSelectName: (name: string) => void;
  basenameChain: Chain;
  iconSize: number;
};
