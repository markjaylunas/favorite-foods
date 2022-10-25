import { FC, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { Badge, Modal } from "@mantine/core";
import { Post } from "@prisma/client";

type Props = {
  foodItem: Post;
};

const FoodCard: FC<Props> = ({ foodItem }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className={`card ${styles.card} `}>
      <div className={styles.modal}>
        <Modal
          opened={opened}
          size="auto"
          title={foodItem.title}
          onClose={() => setOpened(false)}
        >
          <div className="modal-image">
            <Image
              src={foodItem.image}
              alt={foodItem.title}
              width={800}
              height={600}
              objectFit="contain"
              onClick={() => setOpened(true)}
            />
          </div>
        </Modal>
      </div>
      <div className={styles.image}>
        <Image
          src={foodItem.image}
          alt={foodItem.title}
          width={600}
          height={400}
          objectFit="cover"
          onClick={() => setOpened(true)}
        />
      </div>
      <div className={styles.details}>
        <h2>{foodItem.title}</h2>
        <p className={styles.rating}>
          <span className={styles.label}>Rating: </span>
          {foodItem.rating}
        </p>
        {foodItem.isPublic && <Badge color="teal">Public</Badge>}
        {/* <p className={styles.phone}>
          {foodItem.phone &&
            foodItem.phone?.length > 0 &&
            `Order: ${foodItem.phone}`}
        </p> */}
        <p className={styles.description}>{foodItem.description}</p>
      </div>
    </div>
  );
};

export default FoodCard;
