import { FC } from "react";
import { Food } from "../types/foods";
import styles from "../styles/Home.module.css";
import Image from "next/image";

interface Props {
  food: Food;
}

const FoodCard: FC<Props> = ({ food }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={`/img/${food.image}`}
          alt={food.name}
          width={500}
          height={400}
          objectFit="cover"
        />
      </div>
      <div className={styles.details}>
        <h2>{food.name}</h2>
        <span className={styles.rating}>
          <span className={styles.label}>Rating: </span>
          {food.rating}
        </span>
        <p>{food.description}</p>
      </div>
    </div>
  );
};

export default FoodCard;
