import "@mantine/dates/styles.css";
import {
  Button,
  Center,
  Container,
  Loader,
  LoadingOverlay,
  Paper,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTS } from "../../constants/routes";
import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employeeApi";
import type { Employee } from "../../types/employee";
import { EmployeeDetailsForm } from "./components/EmployeeDetailsForm";
import { RefreshIcon } from "../../constants/icons";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/messages";
import { notify } from "../../utils.tsx/notifications";
import { ErrorAlert } from "../../components/ErrorAlert/ErrorAlert";
import { BackButton } from "../../components/BackButton/BackButton";

export const EmployeeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeDetails = async () => {
    if (!id) return;
    setIsFetching(true);
    setError(null);
    try {
      const response = await employeeApi.getById(id);
      if (response) {
        setEmployee(response);
      } else {
        setError(ERROR_MESSAGES.EMPLOYEE_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      setError(ERROR_MESSAGES.FETCH_DETAILS_FAILED);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const handleSave = async (values: Employee) => {
    if (!id) return;
    setIsSaving(true);
    try {
      const updatedEmpolyee = await employeeApi.update(id, values);
      setEmployee(updatedEmpolyee);
      notify.success(SUCCESS_MESSAGES.SAVE_SUCCESS);
    } catch (error) {
      console.error("Saving error", error);
      notify.error(ERROR_MESSAGES.SAVE_FAILED);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const renderContent = () => {
    if (isFetching && !employee) {
      return (
        <Center h="50vh">
          <Loader color="blue" size="xl" type="dots" />
        </Center>
      );
    }

    if (error && !employee) {
      return (
        <Container size="lg" mt="xl">
          <ErrorAlert title={ERROR_MESSAGES.UNKNOWN_ERROR} message={error}>
            <Button
              variant="outline"
              color="red"
              leftSection={<RefreshIcon />}
              onClick={fetchEmployeeDetails}
            >
              Обновить
            </Button>
            <Button
              variant="subtle"
              color="gray"
              onClick={() => navigate(APP_ROUTS.EMPLOYEES)}
            >
              Вернуться к списку
            </Button>
          </ErrorAlert>
        </Container>
      );
    }

    if (employee) {
      return (
        <Paper p="md" shadow="sm" radius="md" withBorder>
          <EmployeeDetailsForm initialData={employee} onSubmit={handleSave} />
        </Paper>
      );
    }

    return null;
  };

  return (
    <Container pos="relative" size="lg">
      <LoadingOverlay
        visible={isSaving}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <BackButton />
      <Title order={2} mt="sm" mb="md">
        Информация о сотруднике
      </Title>
      {renderContent()}
    </Container>
  );
};
