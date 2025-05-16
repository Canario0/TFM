import { Typography, Rating } from "@mui/material";
import { Icons } from "@lib/entities/icons";
import MetadataCard from "@lib/components/metadataCard/metadataCard";
import type { Product } from "@lib/entities/products";
import { translateRating } from "@lib/utils";
import styles from "./basicMetadata.module.css";

interface BasicMetadataProps {
  products: Product[];
}

export function BasicMetadata({ products }: BasicMetadataProps) {
  return (
    <>
      <MetadataCard title="Precio" icon={Icons.Price}>
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id}>
              <Typography>{product.price}€</Typography>
            </li>
          ))}
        </ul>
      </MetadataCard>
      <MetadataCard title="Fabricante" icon={Icons.Other}>
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id}>
              <Typography>{product.maker}</Typography>
            </li>
          ))}
        </ul>
      </MetadataCard>
      <MetadataCard title="Marca" icon={Icons.Other}>
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id}>
              <Typography>{product.brand}</Typography>
            </li>
          ))}
        </ul>
      </MetadataCard>
      <MetadataCard title="Modelo" icon={Icons.Other}>
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id}>
              <Typography>{product.model}</Typography>
            </li>
          ))}
        </ul>
      </MetadataCard>
      <MetadataCard title="Valoración" icon={Icons.Popularity}>
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id}>
              <Rating
                value={translateRating(product.rating)}
                readOnly
                precision={0.5}
              />
            </li>
          ))}
        </ul>
      </MetadataCard>
    </>
  );
} 