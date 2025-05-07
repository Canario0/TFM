import { Avatar, ButtonBase } from "@mui/material";
import styles from "./navbar.module.css";
import { Person } from "@mui/icons-material";
import { Link } from "react-router";

function NavBar() {
  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className={styles.navbar__brand}>
        <Link to="/">Comparathor</Link>
      </div>
      <ButtonBase component="div" tabIndex={-1} aria-label="User Actions">
        <Avatar>
          <Person />
        </Avatar>
      </ButtonBase>
    </nav>
  );
}

export default NavBar;
