declare const window: Window &
  typeof globalThis & {
    ClientAnalytics: {
      logEvent: LogEvent;
    };
  };

enum ComponentType {
  unknown = 'unknown',
  banner = 'banner',
  button = 'button',
  card = 'card',
  chart = 'chart',
  content_script = 'content_script',
  dropdown = 'dropdown',
  link = 'link',
  page = 'page',
  modal = 'modal',
  table = 'table',
  search_bar = 'search_bar',
  service_worker = 'service_worker',
  text = 'text',
  text_input = 'text_input',
  tray = 'tray',
  checkbox = 'checkbox',
  icon = 'icon',
}

enum ActionType {
  unknown = 'unknown',
  blur = 'blur',
  click = 'click',
  change = 'change',
  dismiss = 'dismiss',
  focus = 'focus',
  hover = 'hover',
  select = 'select',
  measurement = 'measurement',
  move = 'move',
  process = 'process',
  render = 'render',
  scroll = 'scroll',
  view = 'view',
  search = 'search',
  keyPress = 'keyPress',
}

enum AnalyticsEventImportance {
  low = 'low',
  high = 'high',
}

type CCAEventData = {
  // Standard Attributes
  action?: ActionType;
  componentType?: ComponentType;
  // Custom Attributes
  doc_helpful?: boolean;
  doc_feedback_reason?: string | null;
  page_path?: string;
  conversation_id?: number;
  message_id?: number;
  response_helpful?: boolean;
  address?: string;
  context?: string;
  userId?: string;
  wallet_type?: string;
};

type AnalyticsEventData = {
  name: string;
  event: CCAEventData;
  importance: AnalyticsEventImportance;
};

type LogEvent = (
  eventName: string,
  eventData: CCAEventData,
  importance?: AnalyticsEventImportance,
) => void;

export default function logEvent(
  name: string,
  event: CCAEventData,
  importance: AnalyticsEventImportance | undefined,
) {
  const CCA = window.ClientAnalytics;
  if (CCA) {
    CCA?.logEvent(name, event, importance);
  }
}

export function identify(event: CCAEventData) {
  const CCA = window.ClientAnalytics;
  if (CCA) {
    CCA?.logEvent('identify', event, AnalyticsEventImportance.low);
  }
}

export { ActionType, AnalyticsEventImportance, ComponentType };
export type { AnalyticsEventData, LogEvent, CCAEventData };
