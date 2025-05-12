import { Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import styles from "./productSelectionButton.module.css";
import type { ProductSummary } from "@lib/entities/productSummary";

interface ProductSelectionButtonProps {
  selectedProducts: ProductSummary[];
  onClick: () => void;
}

function ProductSelectionButton({
  selectedProducts,
  onClick,
}: ProductSelectionButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCompare = () => {
    handleClose();
    onClick();
  };

  return (
    <>
      <Button
        color="primary"
        onClick={handleClick}
        className={styles.fab}
        aria-controls={open ? "product-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
      >
        {selectedProducts.length}{" "}
        {selectedProducts.length > 1
          ? "productos seleccionados"
          : "producto seleccionado"}
      </Button>
      <Menu
        id="product-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {selectedProducts.map((product) => (
          <MenuItem key={product.id} onClick={handleClose}>
            {product.name}
          </MenuItem>
        ))}
        <MenuItem>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCompare}
          >
            Comparar
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProductSelectionButton;
