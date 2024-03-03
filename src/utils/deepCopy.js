export default function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()); // Crée une nouvelle instance de Date avec la même valeur
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }

  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}
