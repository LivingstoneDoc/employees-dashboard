import { Avatar, Burger, Group, Text, Title } from "@mantine/core";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export const Header = ({ opened, toggle }: HeaderProps) => {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          color="white"
        />

        <Title
          order={1}
          size="xl"
          fw={800}
          variant="gradient"
          style={{ letterSpacing: "-0.5px", color: "white" }}
        >
          Mini CRM
        </Title>
      </Group>
      <Group gap="sm">
        <Text size="sm" fw={500} visibleFrom="sm" c="white">
          Иван Иванов
        </Text>
        <Avatar color="white" variant="light" radius="xl" size="sm" />
      </Group>
    </Group>
  );
};
