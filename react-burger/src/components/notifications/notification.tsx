// @ts-ignore
import { Store } from "react-notifications-component";

import { InfoContent } from "./info-content";
import { ErrorContent } from "./error-content";

export const InfoNotification = (message: string): void => {
  Store.addNotification({
    message: message,
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
    message: message,
    insert: "top",
    container: "top-right",
    dismiss: {
      duration: 1,
    },
  });
};
