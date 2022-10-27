import { Container, Space, Title } from "@mantine/core";
import { User } from "@prisma/client";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import UserProfile from "../../components/ProfilePage/UserProfile";

const ProfilePage: NextPage = () => {
  const [userProfile, setuserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", user?.id);
      const userData = data as unknown as User[];
      if (error) console.log(error);
      setuserProfile(userData[0]);
      setLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <Container size="md" px="xs" my="lg">
      <Head>
        <title>Secret | Favorite</title>
        <meta name="description" content="List of public favorites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title order={1}>Profile</Title>
      <Space h="lg" />

      {loading ? <>Loading...</> : <UserProfile user={userProfile} />}
    </Container>
  );
};

export default ProfilePage;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
});
