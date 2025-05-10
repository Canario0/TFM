import { Fab } from "@mui/material";
import styles from "./floatingActionButton.module.css";

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

function FloatingActionButton({ icon, onClick }: FloatingActionButtonProps) {
  return (
    <Fab
      color="primary"
      onClick={onClick}
      className={styles.fab}
    >
      {icon}
    </Fab>
  );
}

export default FloatingActionButton;
