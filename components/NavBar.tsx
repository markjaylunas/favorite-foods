import { Avatar, Group, Menu, UnstyledButton } from "@mantine/core";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { toast } from "react-toastify";
import ThemeButton from "./ThemeButton";

const NavBar: FC = () => {
  const router = useRouter();
  const { supabaseClient, session } = useSessionContext();
  console.log(session);

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      router.replace("/sign-in");
    }
  };
  return (
    <nav className="nav_container">
      <div className="navbar">
        <Group>
          <Link href="/">Home</Link>
          <Link href="/food">Foods</Link>
          <Link href="/movie">Movies</Link>
        </Group>
        <Group>
          {!session ? (
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
                <Menu.Label>User</Menu.Label>
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
