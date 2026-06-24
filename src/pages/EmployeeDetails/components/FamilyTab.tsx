import {
  ActionIcon,
  Button,
  Group,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import {
  RELATIONS,
  type Employee,
  type Relation,
} from "../../../types/employee";
import type { UseFormReturnType } from "@mantine/form";
import { AddIcon, DeleteIcon } from "../../../constants/icons";

interface FamilyTabProps {
  form: UseFormReturnType<Employee>;
}

export const FamilyTab = ({ form }: FamilyTabProps) => {
  return (
    <Tabs.Panel value="family">
      <Group justify="space-between" align="flex-end" mt="md" mb="xs">
        <Text fw={500} size="lg">
          Члены семьи
        </Text>
        <Button
          variant="light"
          size="sm"
          leftSection={<AddIcon />}
          onClick={() =>
            form.insertListItem("family", {
              id: Date.now().toString(),
              fullName: "",
              relation: "" as Relation,
            })
          }
        >
          Добавить
        </Button>
      </Group>
      {form.values.family.length === 0 ? (
        <Text c="dimmed" fs="italic" ta="center" py="sm">
          Нет данных о семье
        </Text>
      ) : (
        <Stack gap="sm">
          {form.values.family.map((member, i) => (
            <Group key={member.id} align="flex-start" wrap="nowrap">
              <TextInput
                placeholder="ФИО родственника *"
                aria-label="ФИО родственника"
                style={{ flex: 2 }}
                withAsterisk
                {...form.getInputProps(`family.${i}.fullName`)}
              />
              <Select
                placeholder="Кем приходится *"
                aria-label="Кем приходится"
                data={RELATIONS}
                style={{ flex: 1 }}
                withAsterisk
                {...form.getInputProps(`family.${i}.relation`)}
              />
              <ActionIcon
                color="red"
                variant="subtle"
                size="lg"
                onClick={() => form.removeListItem("family", i)}
              >
                {<DeleteIcon />}
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      )}
    </Tabs.Panel>
  );
};
