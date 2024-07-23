import { customFields } from './utils/docusaurusCustomFields';

export const isDevelopment = customFields.nodeEnv === 'development';
export const amplitudeApiKey = isDevelopment
  ? 'ca92bbcb548f7ec4b8ebe9194b8eda81'
  : '2b38c7ac93c0dccc83ebf9acc5107413';
export const ampDeploymentKey = isDevelopment
  ? 'client-Wvf63OdaukDZyCBtwgbOvHgGTuASBZFG'
  : 'client-agFoQg5AOvZ2ZiOChny9RrGk21jG3VrH';
