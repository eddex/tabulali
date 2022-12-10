export const toLocalNumber = (number) => {
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  return number.toLocaleString(userLocale, {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  });
};
