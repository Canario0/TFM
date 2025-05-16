import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field, type FormikProps } from "formik";
import * as Yup from "yup";
import styles from "./saveCategoryModal.module.css";
import { useRef } from "react";

interface FormValues {
  name: string;
  description: string;
}

interface SaveCategoryModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  submitButtonLabel: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),
  description: Yup.string()
    .min(0, "La descripción debe tener al menos 0 caracteres")
    .max(100, "La descripción debe tener como máximo 100 caracteres"),
});

export default function SaveCategoryModal({
  open,
  loading,
  onClose,
  onSubmit,
  submitButtonLabel,
}: SaveCategoryModalProps) {
  const ref = useRef<FormikProps<FormValues>>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      ref.current?.submitForm();
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="save-category-modal">
      <Box className={styles.modal}>
        <Formik<FormValues>
          innerRef={ref}
          initialValues={{ name: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.modal__form}>
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="name"
                label="Nombre"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onKeyDown={handleKeyDown}
              />
              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="description"
                label="Descripción"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                onKeyDown={handleKeyDown}
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
