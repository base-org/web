import { useState, useCallback } from 'react';
import { useDoc } from '@docusaurus/theme-common/internal';
import FeedbackModal from './FeedbackModal';
import Icon from '../Icon';

import styles from './styles.module.css';

const logDocFeedback = (isHelpful: boolean, reason?: string) => {
  if (window.ClientAnalytics) {
    const { logEvent, ActionType, ComponentType } = window.ClientAnalytics;

    let path: string = window.location.pathname;

    // Remove trailing slash
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    logEvent('doc_feedback', {
      action: ActionType.click,
      component_type: ComponentType.button,
      doc_helpful: isHelpful,
      doc_feedback_reason: reason ?? null,
      page_path: path,
    });
  }
};

const helpfulReasons = ['Easy to understand', 'Solved my problem', 'Other'];
const notHelpfulReasons = [
  'Missing the information I need',
  'Too complicated / too many steps',
  'Out of date',
  'Samples / code issue',
  'Other',
];

export default function DocFeedback() {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleModalOpen = useCallback(() => setVisible(true), []);
  const handleModalClose = useCallback(() => setVisible(false), []);

  const handleVote = (isHelpful: boolean) => {
    if (helpful !== null && helpful === isHelpful) {
      // User already voted and is trying to undo their vote.
      setHelpful(null);
      return false;
    }
    setHelpful(isHelpful);
    handleModalOpen();
    return true;
  };

  const handleHelpfulClick = useCallback(() => {
    const successful = handleVote(true);

    if (successful) {
      logDocFeedback(true);
    }
  }, [helpful, window.location.pathname]);

  const handleHelpfulModalSubmit = useCallback((reason?: string) => {
    logDocFeedback(true, reason);
    setVisible(false);
  }, []);

  const handleNotHelpfulClick = useCallback(() => {
    const successful = handleVote(false);

    if (successful) {
      logDocFeedback(false);
    }
  }, [helpful, window.location.pathname]);

  const handleNotHelpfulModalSubmit = useCallback((reason?: string) => {
    logDocFeedback(false, reason);
    setVisible(false);
  }, []);

  const { metadata } = useDoc();
  const docFilePath = metadata.source.slice(6); // Remove @site/ from file path

  return (
    <div className={styles.docFeedbackContainer}>
      <p className={styles.feedbackPrompt}>Was this helpful?</p>
      <div className={styles.feedbackButtonContainer}>
        <button type="button" className={styles.helpfulButton} onClick={handleHelpfulClick}>
          {helpful !== true && <Icon name="thumbs-up" width="20" height="20" />}
          {helpful === true && <Icon name="thumbs-up-filled" width="20" height="20" />}
        </button>
        <button type="button" className={styles.notHelpfulButton} onClick={handleNotHelpfulClick}>
          {helpful !== false && <Icon name="thumbs-down" width="20" height="20" />}
          {helpful === false && <Icon name="thumbs-down-filled" width="20" height="20" />}
        </button>
      </div>
      <a
        href={`https://github.com/base-org/web/blob/master/apps/base-docs/${docFilePath}?plain=1`}
        target="_blank"
        className={styles.editDocLink}
        rel="noreferrer"
      >
        Edit this page on GitHub
        <Icon name="external-link" width="11" height="11" />
      </a>
      {helpful && (
        <FeedbackModal
          visible={visible}
          onRequestClose={handleModalClose}
          onSubmit={handleHelpfulModalSubmit}
          options={helpfulReasons}
        />
      )}
      {!helpful && (
        <FeedbackModal
          visible={visible}
          onRequestClose={handleModalClose}
          onSubmit={handleNotHelpfulModalSubmit}
          options={notHelpfulReasons}
        />
      )}
    </div>
  );
}
