import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";

type Props = {
  name: string;
  icon: JSX.Element;
  handler: () => void;
};

const ProviderSignIn: FC<Props> = ({ name, icon, handler }) => {
  return (
    <UnstyledButton onClick={handler}>
      <Group>
        <Avatar size={40} color="blue">
          {icon}
        </Avatar>
        <Text>Continue with {name}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default ProviderSignIn;
