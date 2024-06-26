import styles from "./notifications.module.css";

export const InfoContent = ({ message }: any) => {
  return (
    <div className={styles.containerSuccess}>
      <p className={styles.title}>Информация:</p>
      <p className={styles.text}>{message}</p>
    </div>
  );
};
