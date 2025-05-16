import { type ReactElement } from "react";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { useNavigate } from "react-router";
import styles from "./comparisons.module.css";
import useComparisonsSummary from "@lib/hooks/useComparisonsSummary";
import ComparisonSummaryCard from "@lib/components/comparisonSummaryCard/comparisonSummaryCard";
import { Box, CircularProgress } from "@mui/material";

function Comparisons(): ReactElement {
  const navigate = useNavigate();
  const [state] = useComparisonsSummary();

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

  return (
    <BodyBox className={styles.products}>
      {state.comparisons.map((comparison) => (
        <div key={comparison.id} className={styles.productItem}>
          <ComparisonSummaryCard
            key={comparison.id}
            {...comparison}
            onClick={() => {
              navigate(`/comparativas/${comparison.id}`);
            }}
          />
        </div>
      ))}
    </BodyBox>
  );
}

export default Comparisons;
