/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-blog" />
/// <reference types="@docusaurus/plugin-content-pages" />

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
  action: ActionType;
  component_type: ComponentType;
  // Custom Attributes
  doc_helpful?: boolean;
  doc_feedback_reason?: string | null;
  page_path?: string;
  conversation_id?: number;
  message_id?: number;
  response_helpful?: boolean;
};

export type LogEvent = (
  eventName: string,
  eventData: CCAEventData,
  importance?: AnalyticsEventImportance,
) => void;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    ClientAnalytics?: {
      logEvent: LogEvent;
      ActionType: typeof ActionType;
      ComponentType: typeof ComponentType;
    };
  }
}
