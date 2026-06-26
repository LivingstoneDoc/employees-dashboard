export const APP_ROUTS = {
  DASHBOARD: "/",
  EMPLOYEES: "/employees",
  CREATE_EMPLOYEE: "/employees/new",
  EMPLOYEE_DETAILS_TEMPLATE: "/employees/:id",
  GET_EMPLOYEE_DETAILS_URL: (id: string) => `/employees/${id}`,
} as const;
