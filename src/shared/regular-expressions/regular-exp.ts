export const regularExps = {
  // Verifies email format
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

  atLeastOneUpperCase: /^(?=.*[A-Z]).+$/,

  atLeastOneLowerCase: /^(?=.*[a-z]).+$/,

  atLeastOneDigit: /^(?=.*\d).+$/,

  atLeastOneSpecialChar: /^(?=.*[!@#$%^&*]).+$/,
};
