import ProductFilter from "src/components/Filters/ProductFilter";
import TableProducts from "src/components/Table/TableProducts";
import { ProductContextProvider } from "src/context/ProductContext";

const Products = () => {
  return (
    <ProductContextProvider>
      <ProductFilter />
      <TableProducts />
    </ProductContextProvider>
  );
};

export default Products;
