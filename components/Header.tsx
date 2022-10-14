import { FC } from "react";
import styles from "../styles/Header.module.css";
import ThemeButton from "./ThemeButton";

interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <ThemeButton />
    </header>
  );
};

export default Header;
