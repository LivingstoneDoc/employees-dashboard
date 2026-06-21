import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employeeApi";
import { Button, Container, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { APP_ROUTS } from "../../constants/routes";
import { PAGINATION } from "../../constants/config";

export const EmployeesListPage = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  useEffect(() => {
    const testApi = async () => {
      try {
        console.log("Fetching all employees in progress...");
        const data = await employeeApi.getAll(
          page,
          PAGINATION.DEFAULT_PAGE_SIZE,
        );
        setEmployees(data.data);
        console.log("Employees for this page:", data.data);
        console.log("First Employee:", data.data[0]);
        console.log("Total emplyees", data.total);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    testApi();
  }, []);
  return (
    <Container size="lg">
      <Title order={2}>Список сотрудников</Title>
      <Text>Таблица сотрудников</Text>
      {/* Кнопку ниже сделал просто для проверки работоспособности роутинга */}
      {employees.length > 0 && (
        <Button
          component={Link}
          to={APP_ROUTS.GET_EMPLOYEE_DETAILS_URL(employees[0].id)}
          variant="light"
          size="xs"
        >
          Профиль сотрудника
        </Button>
      )}
    </Container>
  );
};
