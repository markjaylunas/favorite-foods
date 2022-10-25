import styles from "../../styles/Home.module.css";
import FoodCard from "./FoodCard";
import { FC, ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "@mantine/core";
import AddFoodForm from "./AddFoodForm";
import { Post } from "@prisma/client";

export enum Type {
  Food = "Food",
  Movie = "Movie",
}

type Props = {
  foodList: Post[];
  type: Type;
};

enum Sort {
  Default = "Default",
  Increasing = "Increasing",
  Decreasing = "Decreasing",
}

type FormData = {
  filter: string;
  sort: Sort;
};

export const sortByIncreasing = (arr: Post[]) =>
  arr.sort((a, b) => a.rating - b.rating);
export const sortByDecreasing = (arr: Post[]) =>
  arr.sort((a, b) => b.rating - a.rating);

const FoodList: FC<Props> = ({ foodList, type = Type.Food }) => {
  const initialFormData = { filter: "", sort: Sort.Default };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [initialFoods, setInitialFoods] = useState<Post[]>(foodList);
  const [filteredFoods, setFilteredFoods] = useState<Post[]>(initialFoods);
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
      const filtered = initialFoods.filter((food) =>
        food.title.toLowerCase().includes(formData.filter.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(initialFoods);
    }
  };

  useEffect(() => {
    if (formData.sort === Sort.Increasing)
      setFilteredFoods((item) => sortByIncreasing([...item]));
    else if (formData.sort === Sort.Decreasing)
      setFilteredFoods((item) => sortByDecreasing([...item]));
    else setFilteredFoods(initialFoods);
  }, [formData.sort, initialFoods]);

  return (
    <>
      <div className={styles.control}>
        <Button
          variant="light"
          color="teal"
          leftIcon="+"
          onClick={() => setOpenedAddForm(true)}
        >
          Add {type}
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
              <option value={Sort.Default}>{Sort.Default}</option>
              <option value={Sort.Increasing}>{Sort.Increasing}</option>
              <option value={Sort.Decreasing}>{Sort.Decreasing}</option>
            </select>
          </div>
        </form>
      </div>
      <div className={styles.list}>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((foodItem) => (
            <FoodCard foodItem={foodItem} key={foodItem.id} />
          ))
        ) : (
          <h2>Food not found</h2>
        )}
      </div>

      <AddFoodForm
        type={type}
        openedAddForm={openedAddForm}
        setOpenedAddForm={setOpenedAddForm}
        setFilteredFoods={setFilteredFoods}
        setInitialFoodList={setInitialFoods}
      />
    </>
  );
};

export default FoodList;
