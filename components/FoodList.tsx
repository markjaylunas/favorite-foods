import { FC } from "react";
import styles from "../styles/Home.module.css";
import FoodList from "../types/foodList";
import FoodCard from "./FoodCard";

interface Props {
  foodList: FoodList;
}

const FoodList: FC<Props> = ({ foodList }) => {
  return (
    <div className={styles.list}>
      {foodList.length > 0 ? (
        foodList.map((foodItem) => (
          <FoodCard foodItem={foodItem} key={foodItem._id} />
        ))
      ) : (
        <h2>Food not found</h2>
      )}
    </div>
  );
};

export default FoodList;
