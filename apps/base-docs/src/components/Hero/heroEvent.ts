import {
  AnalyticsEventData,
  CCAEventData,
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'base-ui/utils/logEvent';

const eventData: CCAEventData = {
  action: ActionType.click,
  componentType: ComponentType.button,
  context: 'hero',
};

export const heroEvent: AnalyticsEventData = {
  name: 'hero_cta',
  event: eventData,
  importance: AnalyticsEventImportance.high,
};
