import styles from "./notifications.module.css";

export const ErrorContent = ({ message }: any) => {
  return (
    <div className={styles.containerError}>
      <p className={styles.title}>Ошибка!</p>
      <p className={styles.text}>{message}</p>
    </div>
  );
};