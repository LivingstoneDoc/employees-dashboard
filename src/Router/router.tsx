import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTS } from "../constants/routes";
import { RootLayout } from "../Layout/RootLayout";
import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { EmployeesListPage } from "../pages/EmployeesList/EmployeesListPage";
import { EmployeeDetailsPage } from "../pages/EmployeeDetails/EmployeeDetailsPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { EmployeeCreatePage } from "../pages/EmployeeCreatePage/EmployeeCreatePage";

export const router = createBrowserRouter([
  {
    path: APP_ROUTS.DASHBOARD,
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: APP_ROUTS.EMPLOYEES, element: <EmployeesListPage /> },
      { path: APP_ROUTS.CREATE_EMPLOYEE, element: <EmployeeCreatePage /> },
      {
        path: APP_ROUTS.EMPLOYEE_DETAILS_TEMPLATE,
        element: <EmployeeDetailsPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
