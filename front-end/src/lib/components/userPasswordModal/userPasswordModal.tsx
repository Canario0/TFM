import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field, type FormikProps } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import styles from "./userPasswordModal.module.css";
import { useRef, useState } from "react";

interface FormValues {
  username: string;
  password: string;
}

interface UserPasswordModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  submitButtonLabel: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(100, "El nombre de usuario debe tener como máximo 100 caracteres"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(64, "La contraseña debe tener como máximo 64 caracteres"),
});

export default function UserPasswordModal({
  open,
  loading,
  onClose,
  onSubmit,
  submitButtonLabel,
}: UserPasswordModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef<FormikProps<FormValues>>(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      ref.current?.submitForm();
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-password-modal">
      <Box className={styles.modal}>
        <Formik<FormValues>
          innerRef={ref}
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.modal__form}>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="username"
                label="Nombre de usuario"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                onKeyDown={handleKeyPress}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                onKeyDown={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box className={styles.modal__actions}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  loading={loading}
                >
                  {submitButtonLabel}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
