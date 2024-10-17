export type GrantApplicationData = {
  nomineeName: string;
  nomineeTwitter: string;
  nomineeFarcaster: string;
  nomineeEmail: string;
  projectName: string;
  projectUrl: string;
  projectDemoLink: string;
  reasoning: string;
  liveOnBase: boolean;
  acceptedLegalDisclaimer: boolean;
};

export enum FormStates {
  Welcome = 'welcome',
  Started = 'started',
  Submitted = 'submitted',
}
