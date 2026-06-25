import { Button, Group, Tabs } from "@mantine/core";
import { BasicInfoTab } from "./BasicInfoTab";
import { FamilyTab } from "./FamilyTab";
import { EducationTab } from "./EducationTab";
import { WorkExperienceTab } from "./WorkExperienceTab";
import {
  ArchiveIcon,
  GraduationCapIcon,
  UserIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useForm } from "@mantine/form";
import type { Employee, Gender, Status } from "../../../types/employee";
import { useState } from "react";

interface EmployeeDetailsFormProps {
  initialData?: Employee;
  onSubmit: (values: Employee) => Promise<void>;
}

const defaultEmployee: Employee = {
  id: "",
  firstName: "",
  lastName: "",
  middleName: "",
  birthDate: "",
  gender: "" as Gender,
  phone: "",
  email: "",
  status: "" as Status,
  family: [],
  education: [],
  workExperience: [],
};

export const EmployeeDetailsForm = ({
  initialData,
  onSubmit,
}: EmployeeDetailsFormProps) => {
  const form = useForm<Employee>({
    initialValues: initialData || defaultEmployee,
    validate: {
      firstName: (value) => (!value.trim() ? "Пожалуйста, введите имя" : null),
      lastName: (value) =>
        !value.trim() ? "Пожалуйста, введите фамилию" : null,
      birthDate: (value) =>
        !value ? "Пожалуйста, укажите дату рождения" : null,
      gender: (value) => (!value ? "Пожалуйста, выберите пол" : null),
      phone: (value) =>
        !value.trim() ? "Пожалуйста, введите номер телефона" : null,
      email: (value) =>
        !value.trim() ? "Пожалуйста, введите адрес эл. почты" : null,
      status: (value) => (!value ? "Пожалуйста, выберите статус" : null),
      family: {
        fullName: (value) => (!value.trim() ? "Пожалуйста, введите ФИО" : null),
        relation: (value) =>
          !value ? "Пожалуйста, укажите степень родства" : null,
      },
      education: {
        institution: (value) =>
          !value.trim() ? "Пожалуйста, укажите ВУЗ" : null,
        degree: (value) =>
          !value ? "Пожалуйста, укажите ученую степень" : null,
        graduationYear: (value) =>
          !value ? "Пожалуйста, укажите год окончания ВУЗа" : null,
      },
      workExperience: {
        companyName: (value) =>
          !value.trim() ? "Пожалуйста, укажите компанию" : null,
        position: (value) =>
          !value.trim() ? "Пожалуйста, укажите должность" : null,
        startDate: (value) =>
          !value ? "Пожалуйста, укажите дату начала работы" : null,
      },
    },
  });

  const userIcon = <UserIcon size={16} />;
  const familyIcon = <UsersThreeIcon size={16} />;
  const educationIcon = <GraduationCapIcon size={16} />;
  const workIcon = <ArchiveIcon size={16} />;

  const handleSubmit = async (values: Employee) => {
    try {
      await onSubmit(values);
      form.setInitialValues(values);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Tabs defaultValue="basic">
        <Tabs.List mb="md">
          <Tabs.Tab value="basic" leftSection={userIcon}>
            Основная информация
          </Tabs.Tab>
          <Tabs.Tab value="family" leftSection={familyIcon}>
            Семья
          </Tabs.Tab>
          <Tabs.Tab value="education" leftSection={educationIcon}>
            Образование
          </Tabs.Tab>
          <Tabs.Tab value="workExperience" leftSection={workIcon}>
            Опыт работы
          </Tabs.Tab>
        </Tabs.List>
        <BasicInfoTab form={form} />
        <FamilyTab form={form} />
        <EducationTab form={form} />
        <WorkExperienceTab form={form} />
      </Tabs>

      <Group mt="md">
        {form.isDirty() && (
          <Button variant="default" onClick={() => form.reset()}>
            Отменить изменения
          </Button>
        )}
        <Button type="submit" disabled={!form.isDirty()}>
          Сохранить
        </Button>
      </Group>
    </form>
  );
};
