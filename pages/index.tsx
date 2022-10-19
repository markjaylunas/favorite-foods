import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import foodListData from "../data/foodList";
import IFoodList from "../types/foodList";
import FoodList, { Type } from "../components/FoodList";

type Props = {
  foodList: IFoodList;
};

const Home: NextPage<Props> = ({ foodList }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Favourite Food</title>
        <meta name="description" content="List of my favourite foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Favourite Foods</h1>
      </header>
      <main className={styles.main}>
        <FoodList type={Type.Food} foodList={foodList} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const foodList = foodListData;
  return {
    props: {
      foodList,
    },
  };
};
