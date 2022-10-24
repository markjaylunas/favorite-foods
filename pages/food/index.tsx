import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import IFoodList from "../../types/foodList";
import FoodList, { Type } from "../../components/FoodPage/FoodList";
import prisma from "../../utils/prisma";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

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

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
  async getServerSideProps(_, supabase) {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }
    if (data.user.id === null) {
      return { props: {} };
    }

    const userId = data.user.id;
    const postList = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    });
    return { props: { foodList: JSON.parse(JSON.stringify(postList)) } };
  },
});
