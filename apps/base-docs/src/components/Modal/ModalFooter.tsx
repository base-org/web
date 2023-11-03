import styles from './styles.module.css';

export type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles.modalFooter}>{children}</div>;
}
