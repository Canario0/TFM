import { useMemo, type ReactElement } from "react";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { useSearchParams } from "react-router";
import useProductsSummary from "@lib/hooks/useProductsSummary";
import ProductCard from "@lib/components/productCard/productCard";
import styles from "./products.module.css";
import FloatingActionButton from "@lib/components/floatingActionButton/floatingActionButton";
import { Add } from "@mui/icons-material";

function Products(): ReactElement {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("categoria");
  const [state] = useProductsSummary();
  const products = useMemo(() => {
    if (category) {
      return state.products.filter((product) => product.category === category);
    }
    return state.products;
  }, [category, state.products]);
  return (
    <>
      <BodyBox className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <ProductCard
              key={product.id}
              {...product}
              onAdd={() => {
                // TODO: Implement the logic to add a new product
                console.log("clicked");
              }}
            />
          </div>
        ))}
      </BodyBox>
      <FloatingActionButton
        icon={<Add />}
        onClick={() => {
          // TODO: Implement the logic to add a new category
          console.log("clicked");
        }}
      />
    </>
  );
}

export default Products;
