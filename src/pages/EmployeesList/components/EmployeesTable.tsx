import { Badge, Card, Group, Stack, Table, Text } from "@mantine/core";
import type { Employee } from "../../../types/employee";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "../../../store/useFilterStore";
import { PAGINATION } from "../../../constants/config";
import { APP_ROUTS } from "../../../constants/routes";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";
import { useMediaQuery } from "@mantine/hooks";
import { formatDate } from "../../../utils.tsx/date";

interface EmployeesTableProps {
  employees: Employee[];
}

export const EmployeesTable = ({ employees }: EmployeesTableProps) => {
  const navigate = useNavigate();
  const { sortDirection, setSortDirection, setPage } = useFilterStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const arrowUpIcon = <ArrowUpIcon size={20} />;
  const arrowDownIcon = <ArrowDownIcon size={20} />;

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

  const renderMoblieCards = () => {
    return (
      <Stack gap="md" mt="lg">
        <Group justify="flex-end">
          <Text
            size="sm"
            fw={500}
            c="blue"
            onClick={toggleSort}
            style={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Сортировка по ФИО
            {sortDirection === "asc" && arrowUpIcon}
            {sortDirection === "desc" && arrowDownIcon}
          </Text>
        </Group>
        {employees.map((employee) => {
          const fullName = [
            employee.lastName,
            employee.firstName,
            employee.middleName,
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <Card
              key={employee.id}
              withBorder
              shadow="sm"
              padding="lg"
              radius="md"
              onClick={() =>
                navigate(APP_ROUTS.GET_EMPLOYEE_DETAILS_URL(employee.id))
              }
              style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
            >
              <Group justify="space-between" mb="xs" align="flex-start">
                <Text fw={600} size="lg" style={{ flex: 1 }}>
                  {fullName}
                </Text>
                <Badge color={employee.status === "Активен" ? "green" : "gray"}>
                  {employee.status}
                </Badge>
              </Group>
              <Stack gap={4} mt="md">
                <Text size="sm" c="dimmed">
                  <Text span fw={500} c="dark">
                    Email:{" "}
                  </Text>
                  {employee.email}
                </Text>
                <Text size="sm" c="dimmed">
                  <Text span fw={500} c="dark">
                    Дата рождения:{" "}
                  </Text>
                  {formatDate(employee.birthDate)}
                </Text>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    );
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

  const renderDesktopTable = () => {
    return (
      <Table.ScrollContainer minWidth={700} mt="lg">
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
      </Table.ScrollContainer>
    );
  };
  return isMobile ? renderMoblieCards() : renderDesktopTable();
};
