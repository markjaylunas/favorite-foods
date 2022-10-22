import { Overlay, Space, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

type Props = {
  email: string;
};

const MagicEmailSent: FC<Props> = ({ email }) => {
  return (
    <Overlay opacity={0.9} color="#000" zIndex={5}>
      <Space h="sm" mt="lg" pt="lg" />
      <Stack align="center">
        <Title>Email sent&#33;</Title>
        <Text>
          To sign in please click the link we&apos;ve sent to <u>{email}</u>
        </Text>
      </Stack>
    </Overlay>
  );
};

export default MagicEmailSent;
