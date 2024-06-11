export const equals = (
  value1: string | number,
  value2: string | number | string[],
) => {
  if (!["string", "number"].includes(typeof value1)) return false;
  if (!["string", "number"].includes(typeof value2)) return false;

  return value1 === value2;
};

export const contains = (
  value1: string | number,
  value2: string | number | string[],
) => {
  if (typeof value1 !== "string") return false;
  if (typeof value2 !== "string") return false;

  return value1.includes(value2);
};

export const hasAnyValue = (value: string | number) => {
  return !!value;
};

export const isGreaterThan = (
  value1: string | number,
  value2: string | number | string[],
) => {
  if (!+value1) return false;
  if (!+value2) return false;

  return value1 > value2;
};

export const isLessThan = (
  value1: string | number,
  value2: string | number | string[],
) => {
  if (!+value1) return false;
  if (!+value2) return false;

  return value1 < value2;
};

export const hasNoValue = (value: string | number) => {
  return !value;
};

export const isAnyOf = (
  value1: string | number,
  value2: string | number | string[],
) => {
  if (!["string", "number"].includes(typeof value1)) return false;
  if (!Array.isArray(value2) || !value2.length) return false;

  return value2.includes(String(value1));
};
