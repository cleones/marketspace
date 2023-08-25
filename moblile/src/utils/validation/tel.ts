export const DDDs = new Set([
  61, 62, 64, 65, 66, 67, 82, 71, 73, 74, 75, 77, 85, 88, 98, 99,
  83, 81, 87, 86, 89, 84, 79, 68, 96, 92, 97, 91, 93, 94, 69, 95,
  63, 27, 28, 31, 32, 33, 34, 35, 37, 38, 21, 22, 24, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 41, 42, 43, 44, 45, 46, 51, 53, 54, 55, 47, 48, 49
]);


export const validateDDD = (string: string) => {
  string = string.replace(/[^0-9]+/g, '');
  
  if (string.length < 2) {
    return false;
  }
  const ddd = +string.slice(0, 2);
  return DDDs.has(ddd);
};

export const validateTel = (string: string) => {
  if (string.length === 0) {
    return true;
  }
  
  string = string.replace(/[^0-9]+/g, '');
  if (string.length < 11) {
    return false;
  }
  if (!validateDDD(string)) {
    return false;
  }
  return true;
};
