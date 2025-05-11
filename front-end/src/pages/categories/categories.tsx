import type { ReactElement } from "react";
import styles from "./categories.module.css";
import useCategoriesPreview from "@lib/hooks/useCategoriesPreview";
import CategoryCard from "@lib/components/categoryCard/categoryCard";
import { useNavigate } from "react-router";
import FloatingActionButton from "@lib/components/floatingActionButton/floatingActionButton";
import { Add } from "@mui/icons-material";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { useAuth } from "@lib/hooks/useAuth";

function Categories(): ReactElement {
  const auth = useAuth();
  const [state] = useCategoriesPreview();
  const navigate = useNavigate();
  return (
    <>
      <BodyBox className={styles.categories}>
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
      </BodyBox>
      {auth?.isAdmin() && (
        <FloatingActionButton
          icon={<Add />}
          onClick={() => {
            // TODO: Implement the logic to add a new category
            console.log("clicked");
          }}
        />
      )}
    </>
  );
}

export default Categories;
