function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const numberKey = ["r", "2", "w", "4", "z", "6", "u", "j", "9", ";", "-", "="];
const firstKey = ["q", "3", "e", "1", "t", "[", "7", "i", ",", ".", "y", "]"];
const secondKey = ["a", "s", "d", "f", "g", "h", "8", "k", "o", "0", "'"];
const thirdKey = ["5", "x", "c", "v", "b", "n", "m", "l", "p", "/"];

export const numberKeyItems = shuffle(numberKey);
export const firstKeyItems = shuffle(firstKey);
export const secondKeyItems = shuffle(secondKey);
export const thirdKeyItems = shuffle(thirdKey);
