import styles from "./navbar.module.css";
import { Link, Outlet } from "react-router";
import UserMenu from "../userMenu/userMenu";
import { useAuth } from "@lib/hooks/useAuth";
import { CircularProgress } from "@mui/material";

function NavBar() {
  const auth = useAuth();
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
      {auth.loading ? <CircularProgress /> : <Outlet />}
    </>
  );
}

export default NavBar;
