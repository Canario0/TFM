import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { useNavigate, useSearchParams } from "react-router";
import useProductsSummary from "@lib/hooks/useProductsSummary";
import ProductSummaryCard from "@lib/components/productSummaryCard/productSummaryCard";
import styles from "./products.module.css";
import ProductSelectionButton from "@lib/components/productSelectionButton/productSelectionButton";
import SearchBar from "@lib/components/searchBar/searchBar";

function Products(): ReactElement {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("categoria");
  const [state] = useProductsSummary();
  const products = useMemo(() => {
    return state.products.filter((product) => product.category === category);
  }, [category, state.products]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  const handleOnChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleOnSearch = useCallback(() => {
    if (search) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            product.category === category
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [search, products, category]);

  const handleOnClear = useCallback(() => {
    setSearch("");
    setFilteredProducts(products);
  }, [state.products, category]);

  return (
    <>
      <BodyBox className={styles.hero}>
        <SearchBar
          value={search}
          onChange={handleOnChange}
          onSearch={handleOnSearch}
          onClear={handleOnClear}
        />
      </BodyBox>
      <BodyBox className={styles.products}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <ProductSummaryCard
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
            navigate(
              `/comparativas/new?${Array.from(selectedProducts)
                .map((id) => `id=${id}`)
                .join("&")}`
            );
          }}
        />
      )}
    </>
  );
}

export default Products;
