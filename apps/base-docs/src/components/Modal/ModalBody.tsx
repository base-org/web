import styles from './styles.module.css';

export type ModalBodyProps = {
  children: React.ReactNode;
};

export default function ModalBody({ children }: ModalBodyProps) {
  return <div className={styles.modalBody}>{children}</div>;
}
