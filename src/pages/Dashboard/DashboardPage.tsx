import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employeeApi";
import {
  IslandIcon,
  UserCheckIcon,
  UserMinusIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";
import { ERROR_MESSAGES } from "../../constants/messages";
import { ErrorAlert } from "../../components/ErrorAlert/ErrorAlert";
import { RefreshIcon } from "../../constants/icons";
import { BarChart, DonutChart } from "@mantine/charts";

interface DashboardStats {
  total: number;
  active: number;
  vacation: number;
  dismissed: number;
  genderData: { name: string; value: number; color: string }[];
  ageData: { ageGroup: string; count: number }[];
}

export const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await employeeApi.getStats();
      setStats(response);
    } catch (error) {
      console.error("Fetching stats error", error);
      setError(ERROR_MESSAGES.FETCH_STATS_FAILED);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Всего сотрудников",
      value: stats?.total,
      icon: UsersFourIcon,
      color: "blue",
    },
    {
      title: "Активных",
      value: stats?.active,
      icon: UserCheckIcon,
      color: "teal",
    },
    {
      title: "В отпуске",
      value: stats?.vacation,
      icon: IslandIcon,
      color: "yellow",
    },
    {
      title: "Уволенных",
      value: stats?.dismissed,
      icon: UserMinusIcon,
      color: "red",
    },
  ];
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={110} radius="md" />
            ))}
          </SimpleGrid>
          <Grid mt="md">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Skeleton height={300} radius="md" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Skeleton height={300} radius="md" />
            </Grid.Col>
          </Grid>
        </>
      );
    }
    if (error) {
      return (
        <Container size="lg" mt="xl">
          <ErrorAlert title={ERROR_MESSAGES.FETCH_ERROR} message={error}>
            <Button
              variant="outline"
              color="red"
              leftSection={<RefreshIcon />}
              onClick={fetchStats}
            >
              Обновить
            </Button>
          </ErrorAlert>
        </Container>
      );
    }
    if (!stats) return null;
    return (
      <>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          {statCards.map((stat) => (
            <Paper withBorder p="md" radius="md" key={stat.title}>
              <Group justify="space-between">
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  {stat.title}
                </Text>
                <stat.icon
                  size={22}
                  color={`var(--mantine-color-${stat.color}-6)`}
                  stroke="1.5"
                />
              </Group>
              <Group align="flex-end" gap="xs" mt={25}>
                <Text fw={700} size="xl">
                  {stat.value || 0}
                </Text>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
        <Grid mt="md">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper withBorder p="md" radius="md" h="100%">
              <Title order={4} mb="xl">
                Распределение по возрасту
              </Title>
              <BarChart
                h={250}
                data={stats.ageData}
                dataKey="ageGroup"
                series={[
                  { name: "count", color: "blue.6", label: "Сотрудников" },
                ]}
                tickLine="y"
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper withBorder p="md" radius="md" h="100%">
              <Title order={4} mb="xl">
                Соотношение полов
              </Title>
              <Center h={250} w="100%">
                <DonutChart
                  data={stats.genderData}
                  withTooltip
                  size={180}
                  thickness={30}
                />
              </Center>
            </Paper>
          </Grid.Col>
        </Grid>
      </>
    );
  };
  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="md">
        Дашборд
      </Title>
      {renderContent()}
    </Container>
  );
};
