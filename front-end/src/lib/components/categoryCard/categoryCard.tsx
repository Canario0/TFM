import type { Icons } from "@lib/entities/icons";
import { Card, CardActionArea, CardContent } from "@mui/material";
import Icon from "../icon/icon";
import styles from "./categoryCard.module.css";

interface CategoryCardProps {
  icon: Icons;
  name: string;
  onClick: () => void;
}

function CategoryCard({ icon, name, onClick }: CategoryCardProps) {
  return (
    <Card className={styles.card}>
      <CardActionArea onClick={onClick}>
        <CardContent className={styles.content}>
          <div>
            <Icon icon={icon} className={styles.content__icon} />
          </div>
          <div className={styles.content__name}>
            <span>{name}</span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
