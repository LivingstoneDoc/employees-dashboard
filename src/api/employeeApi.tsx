import type { SortDirection } from "../store/useFilterStore";
import type { Employee, Status } from "../types/employee";
import { calculateAge } from "../utils.tsx/date";
import { generateEmployees } from "./fakeDb";

let inMemoryDb: Employee[] = generateEmployees(100);

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeApi = {
  getAll: async (
    page: number,
    limit: number,
    searchQuery: string = "",
    statusFilter: Status | null = null,
    sortDirection: SortDirection | null = null,
  ): Promise<{ data: Employee[]; total: number }> => {
    await delay(500);
    let filteredData = [...inMemoryDb];
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredData = inMemoryDb.filter((employee) => {
        const fullName =
          `${employee.lastName} ${employee.firstName} ${employee.middleName}`.toLowerCase();
        const email = (employee.email || "").toLowerCase();
        return (
          fullName.includes(lowerCaseQuery) || email.includes(lowerCaseQuery)
        );
      });
    }
    if (statusFilter) {
      filteredData = filteredData.filter(
        (employee) => employee.status === statusFilter,
      );
    }
    if (sortDirection) {
      filteredData.sort((a, b) => {
        const nameA =
          `${a.lastName} ${a.firstName} ${a.middleName || ""}`.trim();
        const nameB =
          `${b.lastName} ${b.firstName} ${b.middleName || ""}`.trim();
        if (sortDirection === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    }
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    const total = filteredData.length;
    return { data: paginatedData, total };
  },
  getById: async (id: string): Promise<Employee | undefined> => {
    await delay(300);
    const employee = inMemoryDb.find((e) => e.id === id);
    return employee ? { ...employee } : undefined;
  },
  update: async (
    id: string,
    updatedData: Partial<Employee>,
  ): Promise<Employee> => {
    await delay(800);
    const index = inMemoryDb.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error("Employee not found");
    }
    inMemoryDb[index] = { ...inMemoryDb[index], ...updatedData };
    return { ...inMemoryDb[index] };
  },
  getStats: async () => {
    await delay(400);
    const total = inMemoryDb.length;
    const active = inMemoryDb.filter(
      (employee) => employee.status === "Активен",
    ).length;
    const vacation = inMemoryDb.filter(
      (employee) => employee.status === "В отпуске",
    ).length;
    const dismissed = inMemoryDb.filter(
      (employee) => employee.status === "Уволен",
    ).length;
    const males = inMemoryDb.filter(
      (employee) => employee.gender === "Мужской",
    ).length;
    const females = inMemoryDb.filter(
      (employee) => employee.gender === "Женский",
    ).length;
    const genderData = [
      { name: "Мужской", value: males, color: "blue.5" },
      { name: "Женский", value: females, color: "pink.5" },
    ];
    const ageGroups = {
      "До 25": 0,
      "26-35": 0,
      "36-45": 0,
      "46-55": 0,
      "56+": 0,
    };
    inMemoryDb.forEach((employee) => {
      const age = calculateAge(employee.birthDate);
      if (age !== null) {
        if (age <= 25) ageGroups["До 25"]++;
        else if (age <= 35) ageGroups["26-35"]++;
        else if (age <= 45) ageGroups["36-45"]++;
        else if (age <= 55) ageGroups["46-55"]++;
        else ageGroups["56+"]++;
      }
    });

    const ageData = Object.entries(ageGroups).map(([group, count]) => ({
      ageGroup: group,
      count,
    }));

    return {
      total,
      active,
      vacation,
      dismissed,
      genderData,
      ageData,
    };
  },
  create: async (newEmployee: Employee): Promise<Employee> => {
    await delay(800);
    const newId = Date.now().toString();
    const employeeWithId = { ...newEmployee, id: newId };
    inMemoryDb.unshift(employeeWithId);
    return employeeWithId;
  },
};
