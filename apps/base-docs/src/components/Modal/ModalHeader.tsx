import styles from './styles.module.css';

export type ModalHeaderProps = {
  children: React.ReactNode;
};

export default function ModalHeader({ children }: ModalHeaderProps) {
  return <div className={styles.modalHeader}>{children}</div>;
}
