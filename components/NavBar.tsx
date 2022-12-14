import { Avatar, Group, Menu, UnstyledButton } from "@mantine/core";
import { User } from "@prisma/client";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import ThemeButton from "./ThemeButton";

const NavBar: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = useSupabaseClient();
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN") {
      try {
        const { data, error } = await supabase
          .from("User")
          .select("*")
          .eq("id", session?.user.id)
          .limit(1);

        if (error) throw error;
        else {
          setUser(data[0]);
        }
      } catch (error) {
        throw error;
      }

      setSession(session);
    }
    if (event === "SIGNED_OUT") {
      setSession(session);
      router.push("/sign-in");
    }
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    }
  };

  const handleToProfile = () => router.push("/profile");

  return (
    <nav className="nav_container">
      <div className="navbar">
        <Group>
          <Link href="/">Secret</Link>
          <Link href="/food">Foods</Link>
          <Link href="/movie">Movies</Link>
        </Group>
        <Group>
          {session === null ? (
            <>
              <Link href="/register">Register</Link>
              <Link href="/sign-in">Sign In</Link>
            </>
          ) : (
            <Menu shadow="sm" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  {user !== null && (
                    <Group>
                      <Avatar
                        className="avatar_button"
                        src={user?.avatar}
                        alt={user?.email}
                        radius="sm"
                        size="sm"
                      />
                    </Group>
                  )}
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <Group>
                    User
                    {" - " + session.user.email}
                  </Group>
                </Menu.Label>

                <Menu.Item onClick={handleToProfile}>Profile</Menu.Item>
                <Menu.Divider />

                <Menu.Item
                  onClick={handleSignOut}
                  color="red"
                  className="sign-out_button"
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
          <ThemeButton />
        </Group>
      </div>
    </nav>
  );
};

export default NavBar;
