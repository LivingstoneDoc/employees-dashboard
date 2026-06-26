export const ERROR_MESSAGES = {
  FETCH_EMPLOYEES_FAILED:
    "Не удалось загрузить список сотрудников. Пожалуйста, проверьте подключение и попробуйте снова",
  EMPLOYEE_NOT_FOUND: "Сотрудник не найден",
  FETCH_DETAILS_FAILED: "Не удалось загрузить данные сотрудника",
  SAVE_FAILED: "Не удалось сохранить изменения. Пожалуйста, попробуйте еще раз",
  FETCH_STATS_FAILED:
    "Не удалось загрузить метрики. Пожалуйста, попробуйте еще раз",
  UNKNOWN_ERROR: "Произошла ошибка",
  FETCH_ERROR: "Ошибка загрузки данных",
  CREATE_EMPLOYEE_ERROR: "Во время добавления сотрудника возникла ошибка",
} as const;

export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "Данные сотрудника успешно сохранены",
  CREATE_EMPLOYEE_SUCCESS: "Сотрудник успешно добавлен",
} as const;
