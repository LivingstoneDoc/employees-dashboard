import { useNavigate } from "react-router-dom";
import { APP_ROUTS } from "../../constants/routes";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Group, Text, UnstyledButton } from "@mantine/core";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export const BackButton = ({
  to = APP_ROUTS.EMPLOYEES,
  label = "К списку сотрудников",
}: BackButtonProps) => {
  const navigate = useNavigate();
  const arrowLeftIcon = <ArrowLeftIcon size={20} />;
  return (
    <UnstyledButton
      onClick={() => navigate(to)}
      c="blue.9"
      className="back-link"
    >
      <Group gap={6}>
        {arrowLeftIcon}
        <Text fw={500}>{label}</Text>
      </Group>
    </UnstyledButton>
  );
};
