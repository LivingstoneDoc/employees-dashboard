import { fakerRU as faker } from "@faker-js/faker";
import type {
  Employee,
  FamilyMember,
  Education,
  WorkExperience,
} from "../types/employee";
import {
  GENDERS,
  STATUS,
  RELATIONS,
  EDUCATION_DEGREES,
} from "../types/employee";

const generateFamilyMembers = (): FamilyMember[] => {
  const count = faker.number.int({ min: 0, max: 2 });
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    relation: faker.helpers.arrayElement(RELATIONS),
  }));
};

const generateEducation = (): Education[] => {
  const count = faker.number.int({ min: 1, max: 3 });
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    institution: faker.company.name(),
    degree: faker.helpers.arrayElement(EDUCATION_DEGREES),
    graduationYear: faker.number.int({ min: 1990, max: 2024 }),
  }));
};

const generateWorkExperience = (): WorkExperience[] => {
  const count = faker.number.int({ min: 0, max: 4 });
  const experience = Array.from({ length: count }, (_, index) => {
    const startDate = faker.date.past({ years: 10 });
    const endDate = faker.date.between({ from: startDate, to: new Date() });
    const isCurrentJob = index === 0;
    return {
      id: faker.string.uuid(),
      companyName: faker.company.name(),
      position: faker.person.jobTitle(),
      startDate: startDate.toISOString(),
      endDate: isCurrentJob ? null : endDate.toISOString(),
    };
  });
  return experience.sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
};

export const generateEmployees = (count: number): Employee[] => {
  return Array.from({ length: count }, () => {
    const baseGender = faker.person.sexType();
    const customGender = baseGender === "male" ? GENDERS[0] : GENDERS[1];
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(baseGender),
      lastName: faker.person.lastName(baseGender),
      middleName: faker.person.middleName(baseGender),
      birthDate: faker.date.birthdate().toISOString(),
      gender: customGender,
      phone: faker.phone.number(),
      email: faker.internet.email(),
      status: faker.helpers.arrayElement(STATUS),
      family: generateFamilyMembers(),
      education: generateEducation(),
      workExperience: generateWorkExperience(),
    };
  });
};
