const sanitizeSearchString = (str) => {
  if (!str) return null;

  return str.trim().toLowerCase();
};

export default sanitizeSearchString;
