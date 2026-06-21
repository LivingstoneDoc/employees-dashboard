import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { APP_ROUTS } from "../../constants/routes";

export const NotFoundPage = () => {
  return (
    <Container size="lg" py="md">
      <Stack gap="md">
        <Title order={1}>404 Not Found</Title>
        <Text>Страница не найдена</Text>
        <Link to={APP_ROUTS.DASHBOARD}>
          <Button>На главную</Button>
        </Link>
      </Stack>
    </Container>
  );
};
