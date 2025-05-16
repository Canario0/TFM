import { Card, CardContent, Typography } from "@mui/material";
import styles from "./metadataCard.module.css";
import type { Icons } from "@lib/entities/icons";
import Icon from "../icon/icon";

interface MetadataCardProps {
  title: string;
  icon?: Icons;
  children: React.ReactNode;
}

function MetadataCard({ title, icon, children }: MetadataCardProps) {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.card__title}>
        {icon && <Icon icon={icon} className={styles.icon} />}
        <Typography variant="h6">{title}</Typography>
      </CardContent>
      <CardContent className={styles.card__content}>{children}</CardContent>
    </Card>
  );
}

export default MetadataCard;
