const hexaDecimalCodeSize = 6;

export const hexGenerator = () =>
  [...Array(hexaDecimalCodeSize)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
