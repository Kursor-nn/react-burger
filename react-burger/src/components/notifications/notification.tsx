// @ts-ignore
import { Store } from "react-notifications-component";
import styles from "./notifications.module.css";

export const InfoContent = ({ message }: any) => {
  return (
    <div className={styles.containerSuccess}>
      <p className={styles.title}>Информация:</p>
      <p className={styles.text}>{message}</p>
    </div>
  );
};

export const ErrorContent = ({ message }: any) => {
  return (
    <div className={styles.containerError}>
      <p className={styles.title}>Ошибка!</p>
      <p className={styles.text}>{message}</p>
    </div>
  );
};

export const InfoNotification = (message: string): void => {
  Store.addNotification({
    message: message,
    content: InfoContent,
    type: "info",
    insert: "top",
    container: "top-right",
    dismiss: {
      duration: 5000,
    },
  });
};

export const ErrorNotification = (message: string): void => {
  Store.addNotification({
    type: "danger",
    content: ErrorContent,
    message: message,
    insert: "top",
    container: "top-right",
    dismiss: {
      duration: 1,
    },
  });
};
