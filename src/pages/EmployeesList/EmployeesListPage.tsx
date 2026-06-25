import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employeeApi";
import {
  Alert,
  Box,
  Button,
  Container,
  LoadingOverlay,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import { PAGINATION } from "../../constants/config";
import { useFilterStore } from "../../store/useFilterStore";
import { useDebouncedValue } from "@mantine/hooks";
import { EmployeesFilters } from "./components/EmployeesFilters";
import { EmployeesTable } from "./components/EmployeesTable";
import { RefreshIcon, WarningIcon } from "../../constants/icons";
import { ERROR_MESSAGES } from "../../constants/messages";
import { ErrorAlert } from "../../components/ErrorAlert/ErrorAlert";

export const EmployeesListPage = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchQuery, statusFilter, sortDirection, page, setPage } =
    useFilterStore();
  const [debouncedSearch] = useDebouncedValue(searchQuery, 300);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
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
      setError(ERROR_MESSAGES.FETCH_EMPLOYEES_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, debouncedSearch, statusFilter, sortDirection]);

  const renderContent = () => {
    if (error) {
      return (
        <ErrorAlert title={ERROR_MESSAGES.UNKNOWN_ERROR} message={error}>
          <Button
            variant="outline"
            color="red"
            leftSection={<RefreshIcon />}
            onClick={fetchEmployees}
          >
            Повторить попытку
          </Button>
        </ErrorAlert>
      );
    }

    if (employees.length > 0) {
      return (
        <>
          <EmployeesTable employees={employees} />
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            mt="md"
          />
        </>
      );
    }

    if (!isLoading) {
      return <Text mt="lg">Сотрудники не найдены</Text>;
    }
    return null;
  };

  return (
    <Container size="lg">
      <Title order={2}>Список сотрудников</Title>
      <EmployeesFilters />
      <Box pos="relative" mih="70vh" mt="md">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        {renderContent()}
      </Box>
    </Container>
  );
};
