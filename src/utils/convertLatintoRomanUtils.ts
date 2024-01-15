function convertLatinToRomanUtils(num: number): string | null {

  // there are episode till number 6. That's why no need to create full convertion from latin to roman numerals
  if (num < 1 || num > 10) {
    return null;
  }

  const romanNumerals = [
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];

  return romanNumerals[num];
}

export default convertLatinToRomanUtils;
