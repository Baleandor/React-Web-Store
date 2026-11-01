const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value: number) => currency.format(value);

export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);
