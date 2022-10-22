import { Container, Group, Paper, Space, Text } from "@mantine/core";
import { FC } from "react";

type Props = {
  email: string;
};

const ActivateAccount: FC<Props> = ({ email }) => {
  return (
    <Container>
      <Space h="lg" />
      <Space h="lg" />
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <Group>
          <Text>To activate it, please click the link we&apos;ve sent to </Text>
          <Text underline color="yellow">
            {email}
          </Text>
        </Group>
      </Paper>
    </Container>
  );
};

export default ActivateAccount;
