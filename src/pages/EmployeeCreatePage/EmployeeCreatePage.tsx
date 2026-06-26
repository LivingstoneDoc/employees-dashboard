import { useNavigate } from "react-router-dom";
import { employeeApi } from "../../api/employeeApi";
import type { Employee } from "../../types/employee";
import { notify } from "../../utils.tsx/notifications";
import { APP_ROUTS } from "../../constants/routes";
import { Container, LoadingOverlay, Paper, Title } from "@mantine/core";
import { EmployeeDetailsForm } from "../EmployeeDetails/components/EmployeeDetailsForm";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/messages";
import { useState } from "react";
import { BackButton } from "../../components/BackButton/BackButton";

export const EmployeeCreatePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreate = async (values: Employee) => {
    setIsLoading(true);
    try {
      await employeeApi.create(values);
      notify.success(SUCCESS_MESSAGES.CREATE_EMPLOYEE_SUCCESS);
      navigate(APP_ROUTS.EMPLOYEES);
    } catch (error) {
      console.error("Create employee error", error);
      notify.error(ERROR_MESSAGES.CREATE_EMPLOYEE_ERROR);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container pos="relative" size="lg">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <BackButton />
      <Title order={2} mt="sm" mb="md">
        Добавление нового сотрудника
      </Title>
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <EmployeeDetailsForm onSubmit={handleCreate} />
      </Paper>
    </Container>
  );
};
