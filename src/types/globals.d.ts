interface Window {
  datastore: {
    getProducts: () => ProductType[];
    getProperties: () => PropertyType[];
    getOperators: () => OperatorType[];
  };
}

type PropertyType = {
  id: number;
  name: string;
  type: "string" | "number" | "enumerated";
  values?: string[];
};

type PropertyValue = {
  property_id: number;
  value: string | number;
};

type ProductType = {
  id: number;
  property_values: PropertyValue[];
};

type OperatorType = {
  text: string;
  id: string;
};
