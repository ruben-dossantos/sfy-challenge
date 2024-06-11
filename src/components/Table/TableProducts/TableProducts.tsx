import React from "react";
import { Table, type TableProps } from "antd";
import { ProductContext } from "src/context/ProductContext";
import {
  contains,
  equals,
  hasAnyValue,
  hasNoValue,
  isAnyOf,
  isGreaterThan,
  isLessThan,
} from "src/utils/filters";

const TableProducts = () => {
  const { property, operator, value } = React.useContext(ProductContext);

  const properties = window.datastore.getProperties();
  const products = window.datastore.getProducts();

  const filteredProducts = React.useMemo(() => {
    if (property === undefined) return products;
    if (operator === undefined) return products;
    if (["none", "any"].includes(operator)) {
      const switchOperator = (type: string) =>
        ({
          any: hasAnyValue,
          none: hasNoValue,
        })[type];
      const operation = switchOperator(operator);
      if (!operation) return products;
      return products.filter((product) =>
        operation(product.property_values[property]?.value),
      );
    }

    if (!value || (Array.isArray(value) && !value.length)) return products;
    const switchOperator = (type: string) =>
      ({
        equals,
        contains,
        greater_than: isGreaterThan, // eslint-disable-line camelcase
        less_than: isLessThan, // eslint-disable-line camelcase
        in: isAnyOf,
      })[type];
    const operation = switchOperator(operator);
    if (!operation) return products;
    return products.filter((product) =>
      operation(product.property_values[property]?.value, value),
    );
  }, [property, operator, value, products]);

  const columns: TableProps<ProductType>["columns"] = React.useMemo(
    () =>
      properties.map((property) => ({
        title: property.name,
        dataIndex: "property_values",
        render: (values: PropertyValue[]) => {
          const value = values.find((v) => v.property_id === property.id);
          return value?.value || "-";
        },
        key: property.id,
      })),
    [properties],
  );

  return (
    <Table
      columns={columns}
      dataSource={filteredProducts}
      rowKey="id"
      size="small"
    />
  );
};

export default TableProducts;
