const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let encodedStr = '';
  let charCount = 1;

  for (let index = 0; index < str.length; index++) {
    if (str[index] === str[index + 1]) {
      charCount++;
    } else {
      encodedStr += (charCount > 1 ? charCount : '') + str[index];
      charCount = 1;
    }
  }

  return encodedStr;
}

module.exports = {
  encodeLine,
};
