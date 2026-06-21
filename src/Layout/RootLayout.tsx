import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./Sidebar";
import { useDisclosure } from "@mantine/hooks";

export const RootLayout = () => {
  const MAIN_BG = "blue.8";
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      bg="gray.0"
      withBorder={false}
    >
      <AppShell.Header bg={MAIN_BG}>
        <Header toggle={toggle} opened={opened} />
      </AppShell.Header>
      <AppShell.Navbar p="sm" bg={MAIN_BG}>
        <AppShell.Section grow>
          <SideBar close={close} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
