import { useCallback, useMemo, useState, type ReactElement } from "react";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { useSearchParams } from "react-router";
import useProductsSummary from "@lib/hooks/useProductsSummary";
import ProductCard from "@lib/components/productCard/productCard";
import styles from "./products.module.css";
import ProductSelectionButton from "@lib/components/productSelectionButton/productSelectionButton";

function Products(): ReactElement {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("categoria");
  const [state] = useProductsSummary();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );

  const products = useMemo(() => {
    if (category) {
      return state.products.filter((product) => product.category === category);
    }
    return state.products;
  }, [category, state.products]);

  const productActionHandler = useCallback((productId: string) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = new Set(prevSelectedProducts);
      if (newSelectedProducts.has(productId)) {
        newSelectedProducts.delete(productId);
      } else {
        newSelectedProducts.add(productId);
      }
      return newSelectedProducts;
    });
  }, []);

  return (
    <>
      <BodyBox className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <ProductCard
              key={product.id}
              {...product}
              action={selectedProducts.has(product.id) ? "remove" : "add"}
              onClick={() => productActionHandler(product.id)}
            />
          </div>
        ))}
      </BodyBox>
      {selectedProducts.size > 0 && (
        <ProductSelectionButton
          selectedProducts={products.filter((p) => selectedProducts.has(p.id))}
          onClick={() => {
            console.log("compare");
          }}
        />
      )}
    </>
  );
}

export default Products;
