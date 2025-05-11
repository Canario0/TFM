import type { ReactElement } from "react";
import BodyBox from "@lib/components/bodyBox/bodyBox";
import { useSearchParams } from "react-router";

function Products(): ReactElement {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("categoria");

  return <BodyBox>{category}</BodyBox>;
}

export default Products;
