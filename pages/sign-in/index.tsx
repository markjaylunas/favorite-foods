import styles from "../../styles/Home.module.css";
import type { NextPage } from "next";
import Head from "next/head";
import SignInForm from "../../components/SignInPage/SignInForm";

const SignInPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In | Favourites</title>
        <meta name="description" content="Favourites sign in page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Sign In</h1>
      </header>
      <main className={styles.main}>
        <SignInForm />
      </main>
    </div>
  );
};
export default SignInPage;
