import { Avatar, Group, Menu, UnstyledButton } from "@mantine/core";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import ThemeButton from "./ThemeButton";

const NavBar: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const supabase = useSupabaseClient();
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      setSession(session);
    }
    if (event === "SIGNED_OUT") {
      setSession(session);
      router.push("sign-in");
    }
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    }
  };

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
                  <Group>
                    <Avatar size={40} color="gray">
                      BH
                    </Avatar>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <Group>
                    User
                    {" - " + session.user.email}
                  </Group>
                </Menu.Label>

                <Menu.Item>
                  <Link href="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item onClick={handleSignOut} color="red">
                  Sign Out
                </Menu.Item>

                <Menu.Divider />
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
