import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { AddIcon, DeleteIcon } from "../../../constants/icons";
import { DateInput } from "@mantine/dates";
import type { UseFormReturnType } from "@mantine/form";
import type { Employee } from "../../../types/employee";

interface WorkExperienceProps {
  form: UseFormReturnType<Employee>;
}

export const WorkExperienceTab = ({ form }: WorkExperienceProps) => {
  return (
    <Tabs.Panel value="workExperience">
      <Group justify="space-between" align="flex-end" mt="md" mb="xs">
        <Text fw={500} size="lg">
          Опыт работы
        </Text>
        <Button
          variant="light"
          size="sm"
          leftSection={<AddIcon />}
          onClick={() =>
            form.insertListItem("workExperience", {
              id: Date.now().toString(),
              companyName: "",
              position: "",
              startDate: "",
              endDate: null,
            })
          }
        >
          Добавить
        </Button>
      </Group>
      {form.values.workExperience.length === 0 ? (
        <Text c="dimmed" fs="italic" ta="center" py="sm">
          Нет данных об опыте работы
        </Text>
      ) : (
        <Stack gap="sm">
          {form.values.workExperience.map((job, i) => (
            <Paper key={job.id} withBorder p="md" radius="md">
              <Group justify="space-between" mb="sm">
                <Text fw={500} size="sm" c="blue">
                  Место работы #{i + 1}
                </Text>
                <ActionIcon
                  color="red"
                  variant="subtle"
                  size="lg"
                  onClick={() => form.removeListItem("workExperience", i)}
                >
                  {<DeleteIcon />}
                </ActionIcon>
              </Group>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Название компании"
                    placeholder="ООО Компания"
                    withAsterisk
                    {...form.getInputProps(`workExperience.${i}.companyName`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Должность"
                    placeholder="Frontend Developer"
                    withAsterisk
                    {...form.getInputProps(`workExperience.${i}.position`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DateInput
                    label="Дата начала"
                    placeholder="ДД.ММ.ГГГГ"
                    valueFormat="DD.MM.YYYY"
                    clearable
                    withAsterisk
                    value={job.startDate ? new Date(job.startDate) : null}
                    onChange={(value: any) => {
                      const date = value as Date | null;
                      form.setFieldValue(
                        `workExperience.${i}.startDate`,
                        date ? date.toISOString() : "",
                      );
                    }}
                    error={form.errors?.[`workExperience.${i}.startDate`]}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DateInput
                    label="Дата окончания"
                    placeholder="По настоящее время"
                    valueFormat="DD.MM.YYYY"
                    clearable
                    value={job.endDate ? new Date(job.endDate) : null}
                    onChange={(value: any) => {
                      const date = value as Date | null;
                      form.setFieldValue(
                        `workExperience.${i}.endDate`,
                        date ? date.toISOString() : "",
                      );
                    }}
                    error={form.errors?.[`workExperience.${i}.endDate`]}
                  />
                </Grid.Col>
              </Grid>
            </Paper>
          ))}
        </Stack>
      )}
    </Tabs.Panel>
  );
};
