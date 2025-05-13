import { useCallback, useState, type ReactElement, useEffect } from "react";
import styles from "./categories.module.css";
import useCategoriesSummary from "@lib/hooks/useCategoriesSummary";
import CategoryCard from "@lib/components/categoryCard/categoryCard";
import { useNavigate } from "react-router";
import FloatingActionButton from "@lib/components/floatingActionButton/floatingActionButton";
import { Add } from "@mui/icons-material";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { useAuth } from "@lib/hooks/useAuth";
import SearchBar from "@lib/components/searchBar/searchBar";

function Categories(): ReactElement {
  const auth = useAuth();
  const [state] = useCategoriesSummary();
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(
    state.categories ?? []
  );
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredCategories(state.categories ?? []);
  }, [state.categories]);

  const handleOnChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleOnSearch = useCallback(() => {
    if (search) {
      setFilteredCategories(
        state.categories.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredCategories(state.categories ?? []);
    }
  }, [search, state.categories]);

  const handleOnClear = useCallback(() => {
    setSearch("");
    setFilteredCategories(state.categories ?? []);
  }, [state.categories]);

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
      <BodyBox className={styles.categories}>
        {filteredCategories.map((category) => (
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
