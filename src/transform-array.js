const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!(arr instanceof Array)) {
    const errorMessage = "'arr' parameter must be an instance of the Array!";
    throw new Error(errorMessage);
  }

  let transformedArr = [];
  const deletedIndexes = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    switch (item) {
      case '--discard-next':
        i++;
        deletedIndexes.push(i);
        break;
      case '--discard-prev':
        if (!deletedIndexes.includes(i - 1)) {
          transformedArr.pop();
          deletedIndexes.push(i - 1);
        }
        break;
      case '--double-next':
        if (i < arr.length - 1) {
          transformedArr.push(arr[i + 1]);
        }
        break;
      case '--double-prev':
        if (i > 0 && !deletedIndexes.includes(i - 1)) {
          transformedArr.push(transformedArr[i - 1]);
        }
        break;
      default:
        transformedArr.push(item);
        break;
    }
  }

  return transformedArr;
}

module.exports = {
  transform,
};
