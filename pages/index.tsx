import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import foodListData from "../data/foodList";
import FoodList from "../types/foodList";
import FoodCard from "../components/FoodCard";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "@mantine/core";
import AddFoodForm from "../components/AddFoodForm";

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
  const [initialFoodList, setInitialFoodList] = useState<FoodList>(foodList);
  const [filteredFoods, setFilteredFoods] = useState<FoodList>(initialFoodList);
  const [openedAddForm, setOpenedAddForm] = useState(false);
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
      const filtered = initialFoodList.filter((food) =>
        food.title.toLowerCase().includes(formData.filter.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(initialFoodList);
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
        <div className={styles.control}>
          <Button
            variant="light"
            color="teal"
            leftIcon="+"
            onClick={() => setOpenedAddForm(true)}
          >
            Add Food
          </Button>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input_group}>
              <label htmlFor="filter">Search: </label>
              <input
                type="text"
                name="filter"
                id="filter"
                value={formData.filter}
                onChange={handleOnChange}
              />
              <button>Submit</button>
            </div>
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
        </div>

        <div className={styles.list}>
          {filteredFoods.length > 0 ? (
            filteredFoods.map((foodItem) => (
              <FoodCard foodItem={foodItem} key={foodItem._id} />
            ))
          ) : (
            <h2>Food not found</h2>
          )}
        </div>
        <AddFoodForm
          openedAddForm={openedAddForm}
          setOpenedAddForm={setOpenedAddForm}
          setInitialFoodList={setInitialFoodList}
          setFilteredFoods={setFilteredFoods}
        />
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
