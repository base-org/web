export type GrantApplicationData = {
  builderName: string;
  builderTwitter: string;
  builderFarcaster: string;
  builderEmail: string;
  projectName: string;
  projectUrl: string;
  projectTwitter: string;
  projectFarcaster: string;
  projectDemoLink: string;
  liveOnBase: boolean;
  reasoning: string;
};

export enum FormStates {
  Welcome = 'welcome',
  Started = 'started',
  Submitted = 'submitted',
}
