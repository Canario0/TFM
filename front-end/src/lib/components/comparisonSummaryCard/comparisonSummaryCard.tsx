import { Card, CardActionArea, CardContent } from "@mui/material";
import styles from "./comparisonSummaryCard.module.css";

interface ComparisonSummaryCardProps {
  id: string;
  name: string;
  description?: string;
  onClick: () => void;
}

function ComparisonSummaryCard({
  id,
  name,
  description,
  onClick,
}: ComparisonSummaryCardProps) {
  return (
    <Card className={styles.card}>
      <CardActionArea onClick={onClick}>
        <CardContent className={styles.content}>
          <div className={styles.content__name}>
            <span>{name}</span>
          </div>
          <div>{description}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ComparisonSummaryCard;
