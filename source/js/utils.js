export function getNubmerFromPrice(str) {
  return str.split(" ")[0];
}

export const sortByAscendingAmount = (arr) => {
  return arr.sort((prev, next) => {
    return getNubmerFromPrice(next.price) - getNubmerFromPrice(prev.price);
  });
};

export const sortByDescendingPrice = (arr) => {
  return arr.sort((prev, next) => {
    return getNubmerFromPrice(prev.price) - getNubmerFromPrice(next.price);
  });
};

export function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

export function arraysContainSame(a, b) {
  a = Array.isArray(a) ? a : [];
  b = Array.isArray(b) ? b : [];
  return a.every((el) => b.includes(el));
}
