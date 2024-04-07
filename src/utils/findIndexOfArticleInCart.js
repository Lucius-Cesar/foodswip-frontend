import { useDispatch } from "react-redux";

function areArraysIncludingSameObjects(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (!array2.includes(array1[i])) {
      return false;
    }
  }

  return true;
}

// return -1 if object is not found in array else return index
export default function findIndexOfArticleInCart(article, array) {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (
      Object.keys(array[i]).length === Object.keys(article).length &&
      Object.keys(array[i]).every((key) => {
        if (Array.isArray(array[i][key])) {
          //if Key is an array (options/supplement), compare they contains sames options or supplements
          return areArraysIncludingSameObjects(array[i][key], article[key]);
        }
        if (key !== "quantity") {
          return array[i][key] === article[key];
        } else {
          return true; // Ignore 'quantity' property always true
        }
      })
    ) {
      index = i;
      break;
    }
  }
  return index;
}
