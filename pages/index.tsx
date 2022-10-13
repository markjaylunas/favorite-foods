import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import favoriteFoods from "../data/foods";
import Foods from "../types/foods";
import FoodCard from "../components/FoodCard";
import { ChangeEvent, SyntheticEvent, useState } from "react";

interface Props {
  foods: Foods;
}

enum Sort {
  Default,
  Rating,
}

interface FormData {
  filter: string;
  sort: Sort;
}

const Home: NextPage<Props> = ({ foods }) => {
  const initialFormData = { filter: "", sort: Sort.Default };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [filteredFoods, setFilteredFoods] = useState<Foods>(foods);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const elementName = event.target.name;
    const elementValue = event.target.value;

    setFormData((formData) => {
      return {
        ...formData,
        [elementName]: elementValue,
      };
    });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData.filter.length > 0) {
      setFilteredFoods((foods) =>
        foods.filter((food) =>
          food.name.toLowerCase().includes(formData.filter.toLowerCase())
        )
      );
    } else {
      setFilteredFoods(foods);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Favorite Food</title>
        <meta name="description" content="List of my favorite foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="My Favorite Foods" />
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="filter">Filter</label>
            <input
              type="text"
              name="filter"
              id="filter"
              value={formData.filter}
              onChange={handleOnChange}
            />
          </div>
          <button>Submit</button>
        </form>

        <div>
          {filteredFoods.map((food) => (
            <FoodCard food={food} key={food._id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const foods = favoriteFoods;
  return {
    props: {
      foods,
    },
  };
};
