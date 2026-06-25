import { notifications } from "@mantine/notifications";
import { SUCCESS_MESSAGES } from "../constants/messages";

const TITLES = {
  SUCCESS: "Успешно",
  ERROR: "Ошибка",
};

export const notify = {
  success: (message: string) => {
    notifications.show({
      title: TITLES.SUCCESS,
      message,
      color: "green",
    });
  },
  error: (message: string) => {
    notifications.show({
      title: TITLES.ERROR,
      message,
      color: "red",
    });
  },
};
