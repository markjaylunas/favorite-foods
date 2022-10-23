import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import IFoodList from "../types/foodList";
import FoodList, { Type } from "../components/FoodPage/FoodList";
import prisma from "../utils/prisma";

type Props = {
  foodList: IFoodList;
};

const Home: NextPage<Props> = ({ foodList }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Secret | Favorite</title>
        <meta name="description" content="List of public favorites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Secret Page</h1>
      </header>
      <main className={styles.main}>
        <FoodList type={Type.Food} foodList={foodList} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const postList = await prisma.post.findMany({
    where: { isPublic: true },
  });
  return {
    props: {
      foodList: JSON.parse(JSON.stringify(postList)),
    },
  };
};
