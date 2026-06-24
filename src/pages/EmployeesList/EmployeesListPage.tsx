import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employeeApi";
import { Container, Pagination, Text, Title } from "@mantine/core";
import { PAGINATION } from "../../constants/config";
import { useFilterStore } from "../../store/useFilterStore";
import { useDebouncedValue } from "@mantine/hooks";
import { EmployeesFilters } from "./components/EmployeesFilters";
import { EmployeesTable } from "./components/EmployeesTable";

export const EmployeesListPage = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const { searchQuery, statusFilter, sortDirection, page, setPage } =
    useFilterStore();
  const [debouncedSearch] = useDebouncedValue(searchQuery, 300);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employeeApi.getAll(
          page,
          PAGINATION.DEFAULT_PAGE_SIZE,
          debouncedSearch,
          statusFilter,
          sortDirection,
        );
        setEmployees(response.data);
        const calculatedTotalPages = Math.ceil(
          response.total / PAGINATION.DEFAULT_PAGE_SIZE,
        );
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [page, debouncedSearch, statusFilter, sortDirection]);

  return (
    <Container size="lg">
      <Title order={2}>Список сотрудников</Title>
      <EmployeesFilters />
      {employees.length > 0 ? (
        <EmployeesTable employees={employees} />
      ) : (
        <Text mt="lg">Сотрудники не найдены</Text>
      )}
      <Pagination total={totalPages} value={page} onChange={setPage} mt="md" />
    </Container>
  );
};
