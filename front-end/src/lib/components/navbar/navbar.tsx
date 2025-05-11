import { Avatar, ButtonBase, Menu, MenuItem } from "@mui/material";
import styles from "./navbar.module.css";
import { Person } from "@mui/icons-material";
import { Link, Outlet } from "react-router";
import { useState } from "react";
import { useAuth } from "@lib/providers/authProvider";

function NavBar() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let menuItems: { label: string; onClick: () => void }[] = [];
  if (auth?.user) {
    menuItems = [
      {
        label: "Logout",
        onClick: () => {
          auth.logout();
          setAnchorEl(null);
        },
      },
    ];
  } else {
    menuItems = [
      {
        label: "Register",
        onClick: () => {
          console.log("register");
          setAnchorEl(null);
        },
      },
      {
        label: "Login",
        onClick: () => {
          console.log("login");
          setAnchorEl(null);
        },
      },
    ];
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <ButtonBase
          id="avatar-button"
          aria-controls={open ? "avatar-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          component="div"
          tabIndex={-1}
          aria-label="User Actions"
        >
          <Avatar>
            <Person />
          </Avatar>
        </ButtonBase>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.label} onClick={item.onClick}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
