import { Card, CardContent, IconButton, Rating } from "@mui/material";
import Icon from "../icon/icon";
import styles from "./productSummaryCard.module.css";
import type { Icons } from "@lib/entities/icons";
import { Add, Remove, Star } from "@mui/icons-material";
import { translateRating } from "@lib/utils";

interface ProductSummaryCardProps {
  id: string;
  name: string;
  icon: Icons;
  rating: number;
  action: "add" | "remove";
  onClick: () => void;
}

function ProductSummaryCard({
  id,
  name,
  icon,
  rating,
  action,
  onClick,
}: ProductSummaryCardProps) {
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
            <IconButton
              onClick={onClick}
              className={styles.content__name__icon}
            >
              {action === "add" ? <Add /> : <Remove />}
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

export default ProductSummaryCard;
