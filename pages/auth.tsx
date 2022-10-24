import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Auth page</title>
        <meta name="description" content="List of public favorites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Auth Page</h1>
      </header>
      <main className={styles.main}></main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  console.log("auth started");
  return {
    props: {},
  };
};
