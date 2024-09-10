export const dateFormatter = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export const timeFormatter = (date) => {
  const options = { hour: "numeric", minute: "numeric" };
  return new Date(date).toLocaleTimeString("id-ID", options);
};

export const currencyFormatter = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
