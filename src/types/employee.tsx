export const GENDERS = ["Мужской", "Женский"] as const;
export type Gender = (typeof GENDERS)[number];

export const STATUS = ["Работает", "Уволен", "В отпуске"] as const;
export type Status = (typeof STATUS)[number];

export const RELATIONS = ["Супруг(а)", "Ребенок"] as const;
export type Relation = (typeof RELATIONS)[number];

export const EDUCATION_DEGREES = [
  "Бакалавр",
  "Магистр",
  "Специалист",
  "Кандидат наук",
] as const;
export type EducationDegree = (typeof EDUCATION_DEGREES)[number];

export interface FamilyMember {
  id: string;
  fullName: string;
  relation: Relation;
}

export interface Education {
  institution: string;
  degree: EducationDegree;
  graduationYear: number;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string | null;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  gender: Gender;
  phone: string;
  email: string;
  status: Status;
  family: FamilyMember[];
  education: Education[];
  workExperience: WorkExperience[];
}
