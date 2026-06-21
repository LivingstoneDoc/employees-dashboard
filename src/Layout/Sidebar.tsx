import { NavLink, Text } from "@mantine/core";
import { SquaresFourIcon, UsersIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  close: () => void;
}

export const SideBar = ({ close }: SidebarProps) => {
  const ACTIVE_BG = "blue.9";
  const dashboardIcon = <SquaresFourIcon size={20} />;
  const employeesIcon = <UsersIcon size={20} />;
  const location = useLocation();
  return (
    <>
      <Text size="xs" fw={600} c="blue.2" mb="sm" ml="xs">
        ГЛАВНОЕ МЕНЮ
      </Text>
      <NavLink
        component={Link}
        to="/"
        label="Дашборд"
        leftSection={dashboardIcon}
        active={location.pathname === "/"}
        variant="filled"
        color={ACTIVE_BG}
        c={location.pathname === "/" ? "white" : "blue.1"}
        mb={4}
        onClick={close}
        className="dark-nav"
      />
      <NavLink
        component={Link}
        to="/employees"
        label="Сотрудники"
        leftSection={employeesIcon}
        active={location.pathname.startsWith("/employees")}
        variant="filled"
        color={ACTIVE_BG}
        c={location.pathname.startsWith("/employees") ? "white" : "blue.1"}
        mb={4}
        onClick={close}
        className="dark-nav"
      />
    </>
  );
};
