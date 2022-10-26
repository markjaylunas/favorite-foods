import { Container, Space, Title } from "@mantine/core";
import { User } from "@prisma/client";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import Head from "next/head";
import prisma from "../../utils/prisma";

type Props = {
  user: User;
};

const ProfilePage: NextPage<Props> = ({ user }) => {
  return (
    <Container size="md" px="xs" my="lg">
      <Head>
        <title>Secret | Favorite</title>
        <meta name="description" content="List of public favorites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title order={1}>Profile</Title>
      <Space h="lg" />
      <ProfilePage user={user} />
    </Container>
  );
};

export default ProfilePage;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
  async getServerSideProps(ctx, supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const profile = await prisma.user.findFirst({ where: { id: user?.id } });
    return { props: { user: JSON.parse(JSON.stringify(profile)) } };
  },
});
