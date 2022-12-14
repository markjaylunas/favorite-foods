import "normalize.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AppProps } from "next/app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useColorScheme } from "@mantine/hooks";

export default function App(
  props: AppProps<{
    initialSession: Session;
  }> & { colorScheme: ColorScheme }
) {
  const { Component, pageProps } = props;

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <NavBar />
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            limit={1}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={colorScheme}
          />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionContextProvider>
  );
}
