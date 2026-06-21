import { Container, Group, Text, Title, UnstyledButton } from "@mantine/core";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTS } from "../../constants/routes";

export const EmployeeDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <Container size="lg">
      <UnstyledButton
        onClick={() => navigate(APP_ROUTS.EMPLOYEES)}
        c="blue.9"
        mb="md"
        className="back-link"
      >
        <Group gap={6}>
          <ArrowLeftIcon size={20} />
          <Text fw={500}>К списку сотрудников</Text>
        </Group>
      </UnstyledButton>
      <Title order={2}>Employee Details</Title>
      <Text>Детальная информация о сотруднике</Text>
    </Container>
  );
};
