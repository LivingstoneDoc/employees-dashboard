import { Alert, Group, Text } from "@mantine/core";
import { WarningIcon } from "../../constants/icons";

interface ErrorAlertProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

export const ErrorAlert = ({ title, message, children }: ErrorAlertProps) => {
  return (
    <Alert variant="light" color="red" title={title} icon={<WarningIcon />}>
      <Text mb={children ? "md" : 0}>{message}</Text>
      {children && <Group>{children}</Group>}
    </Alert>
  );
};
