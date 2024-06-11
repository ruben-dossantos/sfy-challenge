import React from "react";

type ProductContextType = {
  property?: number;
  updateProperty: (newProperty?: number) => void;
  operator?: string;
  updateOperator: (newOperator?: string) => void;
  value?: string | number | string[];
  updateValue: (newValue?: string | number | string[]) => void;
  clearFilter: () => void;
};

export const ProductContext = React.createContext<ProductContextType>({
  property: undefined,
  operator: undefined,
  value: undefined,
  updateProperty: () => {},
  updateOperator: () => {},
  updateValue: () => {},
  clearFilter: () => {},
});

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [property, setProperty] = React.useState<number>();
  const [operator, setOperator] = React.useState<string>();
  const [value, setValue] = React.useState<string | number | string[]>();

  const updateProperty = React.useCallback(
    (newProperty?: number) => setProperty(newProperty),
    [],
  );

  const updateOperator = React.useCallback(
    (newOperator?: string) => setOperator(newOperator),
    [],
  );

  const updateValue = React.useCallback(
    (newValue?: string | number | string[]) => setValue(newValue),
    [],
  );

  const clearFilter = React.useCallback(() => {
    updateProperty();
    updateOperator();
    updateValue();
  }, [updateProperty, updateOperator, updateValue]);

  return (
    <ProductContext.Provider
      value={{
        property,
        operator,
        value,
        updateProperty,
        updateOperator,
        updateValue,
        clearFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
