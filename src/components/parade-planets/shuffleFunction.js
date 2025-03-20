export const shuffle = (startingArray) => {
    
  let array = [...startingArray];
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // випадковий індекс від 0 до i
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
