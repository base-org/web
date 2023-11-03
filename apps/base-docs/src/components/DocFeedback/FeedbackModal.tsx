import { useCallback, useState } from 'react';
import Modal from '../Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Icon from '../Icon';

import styles from './styles.module.css';

type FeedbackModalProps = {
  options: string[];
  visible: boolean;
  onRequestClose: () => void;
  onSubmit: (reason?: string) => void;
};

export default function FeedbackModal({
  options,
  visible,
  onRequestClose,
  onSubmit,
}: FeedbackModalProps) {
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected(e.target.value);
    },
    [selected],
  );

  const handleSubmit = useCallback(() => {
    onSubmit(selected);
    onRequestClose();
  }, [selected]);

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <ModalHeader>
        <div className={styles.feedbackModalHeader}>What is the reason for your feedback?</div>
      </ModalHeader>
      <ModalBody>
        <label htmlFor="docFeedback" className={styles.feedbackModalSelectLabel}>
          Please select an option:
          <div className={styles.feedbackModalSelectContainer}>
            <select
              id="docFeedback"
              className={styles.feedbackModalSelect}
              value={selected}
              onChange={handleSelect}
            >
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Icon name="caret-down" width="14" height="14" />
          </div>
        </label>
      </ModalBody>
      <ModalFooter>
        <div className={styles.feedbackModalFooter}>
          <button type="button" className={styles.feedbackModalCancel} onClick={onRequestClose}>
            Cancel
          </button>
          <button type="button" className={styles.feedbackModalSubmit} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
