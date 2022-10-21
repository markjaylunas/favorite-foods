import { Button, Group } from "@mantine/core";
// import { Session } from "@supabase/supabase-js";
// import { setCookie } from "cookies-next";
import Link from "next/link";
// import { useState } from "react";
// import { supabase } from "../utils/supabase";
import ThemeButton from "./ThemeButton";

const NavBar = () => {
  // const [session, setSession] = useState<Session>();

  // const getCurrentUser = async () => {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   if (session?.user) {
  //     setCookie("session", JSON.stringify(session));
  //     setSession(session);
  //   }
  // };
  // getCurrentUser();

  const handleSignOut = async () => {
    // const { error } = await supabase.auth.signOut();
    // if (error) console.error(error);
  };
  return (
    <nav className="nav_container">
      <div className="navbar">
        <Group>
          <Link href="/">Foods</Link>
          <Link href="/movie">Movies</Link>
        </Group>
        <Group>
          {true ? (
            <>
              <Link href="/register">Register</Link>
              <Link href="/signin">Sign In</Link>
            </>
          ) : (
            <>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </>
          )}
          <ThemeButton />
        </Group>
      </div>
    </nav>
  );
};

export default NavBar;
