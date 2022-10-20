import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { supabase } from "../utils/supabase";
import ThemeButton from "./ThemeButton";

const NavBar = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  };
  return (
    <nav className="nav_container">
      <div className="navbar">
        <Group>
          <Link href="/">Foods</Link>
          <Link href="/movie">Movies</Link>
        </Group>
        <Group>
          <Link href="/register">Register</Link>
          <Link href="/signin">Sign In</Link>
          <Button onClick={handleSignOut}>Sign Out</Button>
          <ThemeButton />
        </Group>
      </div>
    </nav>
  );
};

export default NavBar;
