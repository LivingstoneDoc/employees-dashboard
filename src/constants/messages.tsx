export const ERROR_MESSAGES = {
  FETCH_EMPLOYEES_FAILED:
    "Не удалось загрузить список сотрудников. Пожалуйста, проверьте подключение и попробуйте снова",
  EMPLOYEE_NOT_FOUND: "Сотрудник не найден",
  FETCH_DETAILS_FAILED: "Не удалось загрузить данные сотрудника",
  SAVE_FAILED: "Не удалось сохранить изменения. Попробуйте еще раз",
  UNKNOWN_ERROR: "Произошла ошибка",
} as const;

export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "Данные сотрудника успешно сохранены",
} as const;
