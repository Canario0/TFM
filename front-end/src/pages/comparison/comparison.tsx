import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useAuth } from "@lib/hooks/useAuth";
import FloatingActionButton from "@lib/components/floatingActionButton/floatingActionButton";
import { Save } from "@mui/icons-material";
import useComparison from "@lib/hooks/useComparison";
import { useSnackbar } from "notistack";
import { Box, CircularProgress } from "@mui/material";
import styles from "./comparison.module.css";
import ProductCard from "@lib/components/productCard/productCard";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { BasicMetadata } from "../../lib/components/basicMetadata/basicMetadata";
import { SubCategoryMetadata } from "../../lib/components/subCategoryMetadata/subCategoryMetadata";
import type { Icons } from "@lib/entities/icons";
import SaveCategoryModal from "@lib/components/saveCategoryModal/saveCategoryModal";

type GroupedSubCategories = Map<
  string,
  {
    icon: Icons;
    metadata: Map<string, { id: string; value: string }[]>;
  }
>;

function Comparison(): ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, { load, save }] = useComparison();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [openSaveCategoryModal, setOpenSaveCategoryModal] = useState(false);

  const productIds = useMemo(() => {
    return state.comparison?.products.map((product) => product.id) ?? [];
  }, [state.comparison?.products]);

  const groupedSubCategories = useMemo<GroupedSubCategories>(() => {
    const subCategoryMap: GroupedSubCategories = new Map();
    state.comparison?.products.forEach((product) => {
      product.subCategories.forEach((subCategory) => {
        if (!subCategoryMap.has(subCategory.name)) {
          subCategoryMap.set(subCategory.name, {
            icon: subCategory.icon,
            metadata: new Map(),
          });
        }
        subCategory.metadata.forEach((metadata) => {
          const subCategoryData = subCategoryMap.get(subCategory.name)!;
          if (!subCategoryData.metadata.has(metadata.key)) {
            subCategoryData.metadata.set(metadata.key, []);
          }
          subCategoryData.metadata.get(metadata.key)!.push({
            id: product.id,
            value: metadata.value,
          });
        });
      });
    });
    return subCategoryMap;
  }, [state.comparison?.products]);

  useEffect(() => {
    async function loadComparison() {
      try {
        if (!id) {
          const ids = searchParams.getAll("id");
          if (!ids || ids.length === 0) {
            navigate("/");
          }
          await load(undefined, ids);
        } else {
          await load(id, undefined, auth.token!);
        }
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Error desconocido", {
            variant: "error",
          });
        }
      }
    }
    loadComparison();
  }, [
    id,
    searchParams,
    auth.isAuthenticated,
    auth.token,
    navigate,
    load,
    enqueueSnackbar,
  ]);

  const handleOverflow = useCallback(
    (overflow: boolean) => {
      setIsOverflowing(overflow);
    },
    [setIsOverflowing]
  );

  const handleSaveCategorySubmit = useCallback(
    async ({ name, description }: { name: string; description?: string }) => {
      try {
        const comparisonId = await save(auth.token!, name, description);
        navigate(`/comparativas/${comparisonId}`);
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Error desconocido", {
            variant: "error",
          });
        }
      }
    },
    [save, auth.token, enqueueSnackbar]
  );

  if (state.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!state.comparison?.products.length) {
    return <></>;
  }

  return (
    <>
      <BodyBox
        className={`${styles.productContainer} ${
          isOverflowing ? styles.overflowing : ""
        }`}
        onOverflow={handleOverflow}
      >
        {state.comparison.products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </BodyBox>
      <BodyBox className={styles.metadataContainer}>
        <BasicMetadata products={state.comparison.products} />
      </BodyBox>
      {groupedSubCategories &&
        Array.from(groupedSubCategories.entries()).map(
          ([subCategoryName, { icon, metadata }]) => (
            <SubCategoryMetadata
              key={subCategoryName}
              subCategoryName={subCategoryName}
              icon={icon}
              metadata={metadata}
              productIds={productIds}
            />
          )
        )}
      {auth.isAuthenticated && !id && (
        <>
          <FloatingActionButton
            icon={<Save />}
            onClick={() => {
              setOpenSaveCategoryModal(true);
            }}
          />
          <SaveCategoryModal
            open={openSaveCategoryModal}
            onClose={() => setOpenSaveCategoryModal(false)}
            onSubmit={handleSaveCategorySubmit}
            submitButtonLabel="Guardar"
            loading={false}
          />
        </>
      )}
    </>
  );
}

export default Comparison;
