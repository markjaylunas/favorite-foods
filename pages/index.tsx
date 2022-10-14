import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import foodListData from "../data/foods";
import FoodList from "../types/foodList";
import FoodCard from "../components/FoodCard";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

interface Props {
  foodList: FoodList;
}

enum Sort {
  Increasing = "Increasing",
  Decreasing = "Decreasing",
}

interface FormData {
  filter: string;
  sort: Sort;
}

const Home: NextPage<Props> = ({ foodList }) => {
  const initialFormData = { filter: "", sort: Sort.Increasing };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [filteredFoods, setFilteredFoods] = useState<FoodList>(foodList);

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
      const filtered = foodList.filter((food) =>
        food.name.toLowerCase().includes(formData.filter.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(foodList);
    }
  };
  useEffect(() => {
    if (formData.sort === Sort.Increasing)
      setFilteredFoods((item) => [...item].sort((a, b) => a.rating - b.rating));
    if (formData.sort === Sort.Decreasing)
      setFilteredFoods((item) => [...item].sort((a, b) => b.rating - a.rating));
  }, [formData.sort]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Favourite Food</title>
        <meta name="description" content="List of my favourite foods" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Favorite Foods" />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input_group}>
            <label htmlFor="filter">Filter: </label>
            <input
              type="text"
              name="filter"
              id="filter"
              value={formData.filter}
              onChange={handleOnChange}
            />
          </div>
          <button>Submit</button>
          <div className={styles.input_group}>
            <label htmlFor="sort">Rating : </label>
            <select
              name="sort"
              id="sort"
              value={formData.sort}
              onChange={handleOnChange}
            >
              <option value={Sort.Increasing}>{Sort.Increasing}</option>
              <option value={Sort.Decreasing}>{Sort.Decreasing}</option>
            </select>
          </div>
        </form>

        <div className={styles.list}>
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
  const foodList = foodListData;
  return {
    props: {
      foodList,
    },
  };
};
