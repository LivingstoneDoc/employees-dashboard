import type { SortDirection } from "../store/useFilterStore";
import type { Employee, Status } from "../types/employee";
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
};
