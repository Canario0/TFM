import styles from "./navbar.module.css";
import { Link, Outlet } from "react-router";
import UserMenu from "../userMenu/userMenu";

function NavBar() {
  return (
    <>
      <nav
        className={styles.navbar}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className={styles.navbar__brand}>
          <Link to="/">Comparathor</Link>
        </div>
        <UserMenu />
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
