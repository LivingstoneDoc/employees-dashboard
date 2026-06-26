import { Grid, InputBase, Select, Tabs, TextInput } from "@mantine/core";
import { GENDERS, STATUS, type Employee } from "../../../types/employee";
import type { UseFormReturnType } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IMaskInput } from "react-imask";

interface BasicInfoTabProps {
  form: UseFormReturnType<Employee>;
}

export const BasicInfoTab = ({ form }: BasicInfoTabProps) => {
  return (
    <Tabs.Panel value="basic">
      <Grid>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput
            label="Фамилия"
            placeholder="Иванов"
            withAsterisk
            {...form.getInputProps("lastName")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput
            label="Имя"
            placeholder="Иван"
            withAsterisk
            {...form.getInputProps("firstName")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput
            label="Отчество"
            placeholder="Иванович"
            {...form.getInputProps("middleName")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <DateInput
            label="Дата рождения"
            placeholder="01.01.1970"
            valueFormat="DD.MM.YYYY"
            clearable
            withAsterisk
            {...form.getInputProps("birthDate")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput
            label="Email"
            placeholder="ivanov@example.com"
            withAsterisk
            {...form.getInputProps("email")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <InputBase
            label="Телефон"
            component={IMaskInput}
            mask="8 (000) 000 00-00"
            placeholder="8 (999) 000 00-00"
            withAsterisk
            {...form.getInputProps("phone")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            label="Статус"
            data={STATUS}
            withAsterisk
            {...form.getInputProps("status")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            label="Пол"
            placeholder="Выберите пол"
            data={GENDERS}
            withAsterisk
            clearable
            {...form.getInputProps("gender")}
          />
        </Grid.Col>
      </Grid>
    </Tabs.Panel>
  );
};
