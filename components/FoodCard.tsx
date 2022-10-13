import { FC, useState } from "react";
import { Food } from "../types/foods";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { Modal } from "@mantine/core";
interface Props {
  food: Food;
}

const FoodCard: FC<Props> = ({ food }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.card}>
      <div className={styles.modal}>
        <Modal
          opened={opened}
          size="auto"
          title={food.name}
          onClose={() => setOpened(false)}
        >
          <div className="modal-image">
            <Image
              src={`/img/${food.image}`}
              alt={food.name}
              width={800}
              height={600}
              objectFit="cover"
              onClick={() => setOpened(true)}
            />
          </div>
        </Modal>
      </div>
      <div className={styles.image}>
        <Image
          src={`/img/${food.image}`}
          alt={food.name}
          width={600}
          height={400}
          objectFit="cover"
          onClick={() => setOpened(true)}
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
