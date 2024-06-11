import React from "react";
import { Button, Flex, Form, Input, Select, Space } from "antd";
import debounce from "lodash.debounce";
import { ProductContext } from "src/context/ProductContext";

const TYPE_OPERATOR = {
  string: ["equals", "any", "none", "in", "contains"],
  number: ["equals", "greater_than", "less_than", "any", "none", "in"],
  enumerated: ["equals", "any", "none", "in"],
};

const ProductFilter = () => {
  const [form] = Form.useForm();
  const {
    property,
    updateProperty,
    operator,
    updateOperator,
    value,
    updateValue,
    clearFilter,
  } = React.useContext(ProductContext);

  const properties = window.datastore.getProperties();
  const operators = window.datastore.getOperators();

  const optionsProperty = React.useMemo(
    () =>
      properties.map((property) => ({
        value: property.id,
        label: property.name,
      })),
    [properties],
  );
  const propertyObject = React.useMemo(
    () => properties.find((p) => p.id === property),
    [properties, property],
  );
  const optionsOperator = React.useMemo(() => {
    const filteredOperators = propertyObject
      ? operators.filter((operator) =>
          TYPE_OPERATOR[propertyObject.type].includes(operator.id),
        )
      : operators;
    return filteredOperators.map((operator) => ({
      value: operator.id,
      label: operator.text,
    }));
  }, [propertyObject, operators]);

  const optionsValue = React.useMemo(() => {
    if (propertyObject?.values) {
      return propertyObject.values.map((label) => ({
        label,
        value: label,
      }));
    }
    return [];
  }, [propertyObject]);

  const handleChangeProperty = React.useCallback(
    (value: number) => {
      updateProperty(value);
      // TODO: should clear operator if current operator is invalid
    },
    [updateProperty],
  );

  const handleChangeOperator = React.useCallback(
    (value: string) => {
      updateOperator(value);
    },
    [updateOperator],
  );

  const handleChangeValue = React.useMemo(() => {
    const defineSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      updateValue(event.target.value);
    };

    return debounce(defineSearch, 400);
  }, [updateValue]);

  const handleChangeValueMultiple = React.useCallback(
    (selected: string[]) => {
      updateValue(selected);
    },
    [updateValue],
  );

  const handleClear = React.useCallback(() => {
    form.setFieldValue("property", undefined);
    form.setFieldValue("operator", undefined);
    form.setFieldValue("value", undefined);

    clearFilter();
  }, [form, clearFilter]);

  return (
    <Form
      form={form}
      initialValues={{ property, operator, value }}
      style={{
        margin: "24px 0",
        padding: 8,
        width: "100%",
        height: 48,
        borderRadius: 5,
        backgroundColor: "#fff",
      }}
    >
      <Flex justify="space-between" align="start">
        <Space>
          <Form.Item name="property">
            <Select
              placeholder="Select a Property..."
              options={optionsProperty}
              style={{ minWidth: 200 }}
              onChange={handleChangeProperty}
            />
          </Form.Item>
          <Form.Item name="operator">
            <Select
              placeholder="Select an Operator..."
              options={optionsOperator}
              style={{ minWidth: 200 }}
              onChange={handleChangeOperator}
            />
          </Form.Item>
          <Form.Item name="value">
            {["equals", "greater_than", "less_than", "contains"].includes(
              operator || "",
            ) && <Input.Search onChange={handleChangeValue} />}
            {operator === "in" && (
              <Select
                mode="multiple"
                options={optionsValue}
                onChange={handleChangeValueMultiple}
                style={{ minWidth: 200 }}
              />
            )}
          </Form.Item>
        </Space>
        <Space>
          <Button onClick={handleClear}>Clear</Button>
        </Space>
      </Flex>
    </Form>
  );
};

export default ProductFilter;
