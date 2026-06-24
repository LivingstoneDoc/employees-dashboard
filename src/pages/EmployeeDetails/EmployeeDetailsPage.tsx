import "@mantine/dates/styles.css";
import {
  Center,
  Container,
  Group,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTS } from "../../constants/routes";
import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employeeApi";
import type { Employee } from "../../types/employee";
import { EmployeeDetailsForm } from "./components/EmployeeDetailsForm";

export const EmployeeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!id) return;
      try {
        const response = await employeeApi.getById(id);
        if (response) {
          setEmployee(response);
        } else {
          console.error("Сотрудник не найден");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  const handleSave = () => {
    console.log("The form is valid and ready to submit");
  };

  if (!employee) {
    return <Center h="100vh">Сотрудник не найден</Center>;
  }

  return (
    <Container size="lg">
      <UnstyledButton
        onClick={() => navigate(APP_ROUTS.EMPLOYEES)}
        c="blue.9"
        className="back-link"
      >
        <Group gap={6}>
          <ArrowLeftIcon size={20} />
          <Text fw={500}>К списку сотрудников</Text>
        </Group>
      </UnstyledButton>
      <Title order={2} mt="sm">
        Информация о сотруднике
      </Title>
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <EmployeeDetailsForm initialData={employee} onSubmit={handleSave} />
      </Paper>
    </Container>
  );
};
