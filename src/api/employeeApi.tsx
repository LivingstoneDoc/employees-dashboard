import type { Employee } from "../types/employee";
import { generateEmployees } from "./fakeDb";

let inMemoryDb: Employee[] = generateEmployees(100);

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeApi = {
  getAll: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Employee[]; total: number }> => {
    await delay(500);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = inMemoryDb.slice(startIndex, endIndex);
    const total = inMemoryDb.length;
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
};
