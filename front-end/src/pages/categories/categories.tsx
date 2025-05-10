import type { ReactElement } from "react";
import styles from "./categories.module.css";
import useCategoriesPreview from "@lib/hooks/useCategoriesPreview";
import CategoryCard from "@lib/components/categoryCard/categoryCard";
import { useNavigate } from "react-router";

function Categories(): ReactElement {
  const [state] = useCategoriesPreview();
  const navigate = useNavigate();
  return (
    <div className={styles.categories}>
      {state.categories.map((category) => (
        <div key={category.id} className={styles.categoryItem}>
          <CategoryCard
            icon={category.icon}
            name={category.name}
            onClick={() => {
              navigate(`/productos?categoria=${category.name}`);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Categories;
