import { FC } from "react";
import { Food } from "../types/foods";

interface Props {
  food: Food;
}

const FoodCard: FC<Props> = ({ food }) => {
  return <div>{food.name}</div>;
};

export default FoodCard;
