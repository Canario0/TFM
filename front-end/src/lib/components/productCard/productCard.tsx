import { Card, CardContent } from "@mui/material";
import Icon from "../icon/icon";
import styles from "./productCard.module.css";
import type { Icons } from "@lib/entities/icons";

interface ProductCardProps {
  name: string;
  icon: Icons;
}

function ProductCard({ name, icon }: ProductCardProps) {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div>
          <Icon icon={icon} className={styles.content__icon} />
        </div>
        <div>
          <span>{name}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
