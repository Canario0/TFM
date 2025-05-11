import { Card, CardContent, IconButton, Rating } from "@mui/material";
import Icon from "../icon/icon";
import styles from "./productCard.module.css";
import type { Icons } from "@lib/entities/icons";
import { Add, Star } from "@mui/icons-material";

interface ProductCardProps {
  id: string;
  name: string;
  icon: Icons;
  rating: number;
  onAdd: () => void;
}

const translateRating = (rating: number): number => {
  return Math.round(rating / 2);
};

function ProductCard({ id, name, icon, rating, onAdd }: ProductCardProps) {
  const translatedRating = translateRating(rating);
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div>
          <Icon icon={icon} className={styles.content__icon} />
        </div>
        <div>
          <div className={styles.content__name}>
            <span>{name}</span>
            <IconButton onClick={onAdd} className={styles.content__name__icon}>
              <Add />
            </IconButton>
          </div>
          <div>
            <Rating
              name="text-feedback"
              value={translatedRating}
              readOnly
              precision={0.5}
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
              size="small"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
