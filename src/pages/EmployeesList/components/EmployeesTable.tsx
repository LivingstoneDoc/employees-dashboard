import { Group, Table } from "@mantine/core";
import type { Employee } from "../../../types/employee";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "../../../store/useFilterStore";
import { PAGINATION } from "../../../constants/config";
import { APP_ROUTS } from "../../../constants/routes";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";

interface EmployeesTableProps {
  employees: Employee[];
}

export const EmployeesTable = ({ employees }: EmployeesTableProps) => {
  const navigate = useNavigate();
  const { sortDirection, setSortDirection, setPage } = useFilterStore();
  const arrowUpIcon = <ArrowUpIcon size={20} />;
  const arrowDownIcon = <ArrowDownIcon size={20} />;

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const toggleSort = () => {
    if (sortDirection === null) {
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection(null);
    }
    setPage(PAGINATION.DEFAULT_PAGE);
  };

  const rows = employees.map((employee) => {
    const fullName = [
      employee.lastName,
      employee.firstName,
      employee.middleName,
    ]
      .filter(Boolean)
      .join(" ");
    const formattedirthDate = formatDate(employee.birthDate);
    return (
      <Table.Tr
        key={employee.id}
        onClick={() =>
          navigate(APP_ROUTS.GET_EMPLOYEE_DETAILS_URL(employee.id))
        }
        style={{ cursor: "pointer" }}
      >
        <Table.Td>{fullName}</Table.Td>
        <Table.Td>{formattedirthDate}</Table.Td>
        <Table.Td>{employee.email}</Table.Td>
        <Table.Td>{employee.status}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Table striped highlightOnHover mt="lg">
      <Table.Thead>
        <Table.Tr>
          <Table.Th
            onClick={toggleSort}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <Group gap="xs">
              ФИО {sortDirection === "asc" && arrowUpIcon}{" "}
              {sortDirection === "desc" && arrowDownIcon}
            </Group>
          </Table.Th>
          <Table.Th>Дата рождения</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Статус</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
