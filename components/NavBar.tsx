import Link from "next/link";
import ThemeButton from "./ThemeButton";

const NavBar = () => {
  return (
    <nav className="nav_container">
      <div className="navbar">
        <div>
          <Link href="/">Foods</Link>
          <Link href="/movie">Movies</Link>
        </div>
        <ThemeButton />
      </div>
    </nav>
  );
};

export default NavBar;
