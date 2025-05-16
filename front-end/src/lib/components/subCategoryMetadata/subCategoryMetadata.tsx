import { Typography } from "@mui/material";
import Icon from "@lib/components/icon/icon";
import MetadataCard from "@lib/components/metadataCard/metadataCard";
import type { Icons } from "@lib/entities/icons";
import styles from "./subCategoryMetadata.module.css";
import BodyBox from "@lib/components/bodyBox/bodyBox";

interface SubCategoryMetadataProps {
  subCategoryName: string;
  icon: Icons;
  metadata: Map<string, { id: string; value: string }[]>;
  productIds: string[];
}

function normalizeMetadataValues(
  productIds: string[],
  idValueList: { id: string; value: string }[]
): Map<string, string> {
  const normalizedValues = new Map<string, string>();
  idValueList.forEach((item) => {
    normalizedValues.set(item.id, item.value);
  });
  const missingIds = productIds.filter((id) => !normalizedValues.has(id));
  missingIds.forEach((id) => {
    normalizedValues.set(id, "desconocido");
  });
  return normalizedValues;
}

export function SubCategoryMetadata({
  subCategoryName,
  icon,
  metadata,
  productIds,
}: SubCategoryMetadataProps) {
  return (
    <BodyBox className={styles.metadataContainer}>
      <div className={styles.subCategoryHeader}>
        <Icon icon={icon} />
        <Typography variant="h6">{subCategoryName}</Typography>
      </div>
      {Array.from(metadata.entries()).map(([key, values]) => (
        <MetadataCard key={key} title={key}>
          <ul className={styles.list}>
            {productIds.map((id) => {
              const value =
                normalizeMetadataValues(productIds, values).get(id) ||
                "desconocido";
              return (
                <li key={id}>
                  <Typography>{value}</Typography>
                </li>
              );
            })}
          </ul>
        </MetadataCard>
      ))}
    </BodyBox>
  );
}
