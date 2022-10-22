import styles from "../../styles/Home.module.css";
import type { NextPage } from "next";
import Head from "next/head";
import RegisterForm from "../../components/RegisterPage/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Register | Favourites</title>
        <meta name="description" content="register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Create an account</h1>
      </header>
      <main className={styles.main}>
        <RegisterForm />
      </main>
    </div>
  );
};
export default RegisterPage;
