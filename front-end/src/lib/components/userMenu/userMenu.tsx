import { Person } from "@mui/icons-material";
import { Avatar, ButtonBase, Menu, MenuItem } from "@mui/material";
import UserPasswordModal from "../userPasswordModal/userPasswordModal";
import { useState } from "react";
import { useAuth } from "@lib/providers/authProvider";
import { useSnackbar } from "notistack";
import { InternalError, UnauthorizedError } from "@lib/entities/errors";
import { containsCode } from "@lib/utils";

function UserMenu() {
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

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
          setAnchorEl(null);
          setOpenRegisterModal(true);
        },
      },
      {
        label: "Login",
        onClick: () => {
          setAnchorEl(null);
          setOpenLoginModal(true);
        },
      },
    ];
  }

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLoginSubmit = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      await auth.login(credentials);
      setOpenLoginModal(false);
      enqueueSnackbar("¡Sesión iniciada con éxito!", {
        variant: "success",
      });
    } catch (error) {
      if (containsCode(error, UnauthorizedError.code)) {
        enqueueSnackbar(UnauthorizedError.message, {
          variant: "error",
        });
      } else if (containsCode(error, InternalError.code)) {
        enqueueSnackbar(InternalError.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error desconocido al iniciar sesión", {
          variant: "error",
        });
      }
    }
  };

  const handleRegisterSubmit = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      await auth.register(credentials);
      await auth.login(credentials);
      setOpenRegisterModal(false);
      enqueueSnackbar("¡Usuario registrado con éxito!", {
        variant: "success",
      });
    } catch (error) {
      if (containsCode(error, UnauthorizedError.code)) {
        enqueueSnackbar(UnauthorizedError.message, {
          variant: "error",
        });
      } else if (containsCode(error, InternalError.code)) {
        enqueueSnackbar(InternalError.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error desconocido al registrar usuario", {
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      <ButtonBase
        id="avatar-button"
        aria-controls={openMenu ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClickMenu}
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
        open={openMenu}
        onClose={handleCloseMenu}
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
      <UserPasswordModal
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        onSubmit={handleLoginSubmit}
        submitButtonLabel="Iniciar Sesión"
        loading={auth.loading}
      />
      <UserPasswordModal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        onSubmit={handleRegisterSubmit}
        submitButtonLabel="Registrarse"
        loading={auth.loading}
      />
    </>
  );
}

export default UserMenu;
