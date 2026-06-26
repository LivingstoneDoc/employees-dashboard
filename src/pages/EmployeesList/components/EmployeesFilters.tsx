import { CloseButton, Group, Select, TextInput } from "@mantine/core";
import { STATUS, type Status } from "../../../types/employee";
import { useFilterStore } from "../../../store/useFilterStore";
import { PAGINATION } from "../../../constants/config";

export const EmployeesFilters = () => {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    setPage,
  } = useFilterStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(PAGINATION.DEFAULT_PAGE);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(PAGINATION.DEFAULT_PAGE);
  };

  const handleStatusChange = (value: string | null) => {
    setStatusFilter(value as Status | null);
    setPage(PAGINATION.DEFAULT_PAGE);
  };

  return (
    <Group>
      <TextInput
        flex={1}
        placeholder="Поиск по ФИО или Email"
        value={searchQuery}
        onChange={handleSearchChange}
        rightSectionPointerEvents="all"
        rightSection={
          searchQuery.length > 0 ? (
            <CloseButton
              aria-label="Очистить поиск"
              onClick={clearSearch}
              size="sm"
            />
          ) : null
        }
      />
      <Select
        w={{ base: "100%", sm: 200 }}
        placeholder="Выберите статус"
        data={[...STATUS]}
        value={statusFilter}
        onChange={handleStatusChange}
        clearable
      />
    </Group>
  );
};
