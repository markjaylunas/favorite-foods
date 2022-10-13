import { FC } from "react";
import styles from "../styles/Header.module.css";

interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
