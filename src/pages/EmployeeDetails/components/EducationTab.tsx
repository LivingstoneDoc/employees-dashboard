import {
  ActionIcon,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import {
  EDUCATION_DEGREES,
  type EducationDegree,
  type Employee,
} from "../../../types/employee";
import { AddIcon, DeleteIcon } from "../../../constants/icons";
import type { UseFormReturnType } from "@mantine/form";

interface EducationTabProps {
  form: UseFormReturnType<Employee>;
}

export const EducationTab = ({ form }: EducationTabProps) => {
  return (
    <Tabs.Panel value="education">
      <Group justify="space-between" align="flex-end" mt="md" mb="xs">
        <Text fw={500} size="lg">
          Образование
        </Text>
        <Button
          variant="light"
          size="sm"
          leftSection={<AddIcon />}
          onClick={() =>
            form.insertListItem("education", {
              id: Date.now().toString(),
              institution: "",
              degree: "" as EducationDegree,
              graduationYear: new Date().getFullYear(),
            })
          }
        >
          Добавить
        </Button>
      </Group>
      {form.values.education.length === 0 ? (
        <Text c="dimmed" fs="italic" ta="center" py="sm">
          Нет данных об образовании
        </Text>
      ) : (
        <Stack gap="xl">
          {form.values.education.map((edu, i) => (
            <Grid key={edu.id} align="flex-start" gap="xs">
              <Grid.Col span={{ base: 12, sm: 5 }}>
                <TextInput
                  placeholder="Название ВУЗа/Колледжа *"
                  aria-label="Название ВУЗа/Колледжа"
                  style={{ flex: 3 }}
                  withAsterisk
                  {...form.getInputProps(`education.${i}.institution`)}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Select
                  placeholder="Степень *"
                  aria-label="Степень"
                  data={EDUCATION_DEGREES}
                  style={{ flex: 2 }}
                  withAsterisk
                  {...form.getInputProps(`education.${i}.degree`)}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 10, sm: 2 }}>
                <NumberInput
                  placeholder="Год окончания *"
                  aria-label="Год окончания"
                  style={{ flex: 1 }}
                  allowDecimal={false}
                  allowNegative={false}
                  hideControls
                  withAsterisk
                  {...form.getInputProps(`education.${i}.graduationYear`)}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 2, sm: 1 }}>
                <ActionIcon
                  color="red"
                  variant="subtle"
                  size="lg"
                  onClick={() => form.removeListItem("education", i)}
                >
                  {<DeleteIcon />}
                </ActionIcon>
              </Grid.Col>
            </Grid>
          ))}
        </Stack>
      )}
    </Tabs.Panel>
  );
};
