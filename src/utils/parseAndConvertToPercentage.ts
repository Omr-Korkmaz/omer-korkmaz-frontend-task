export const parseAndConvertToPercentage = (rating: string): number | null => {
  // already in percentage format
  if (rating.includes("%")) {
    const numericPart = parseFloat(rating);

    // is a valid number
    if (!isNaN(numericPart)) {
      return numericPart;
    } else {
      return null;
    }
  }

  // Extract the numeric part
  const numericPart = parseFloat(rating);

  if (!isNaN(numericPart)) {
    // for Metacritic
    if (rating.includes("/100")) {
      return numericPart;
    }
    //  for IMDB
    else if (rating.includes("/10")) {
      return numericPart * 10;
    }
  }
  return null;
};
