const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: '',
  length: 0,

  getLength() {
    return this.length;
  },
  addLink(value) {
    this.chain += `${!this.getLength() ? `` : `~~`}( ${value} )`;
    this.length++;
    return this;
  },
  removeLink(position) {
    if (
      !Number.isInteger(position) ||
      position <= 0 ||
      position > this.length
    ) {
      this.reset();
      throw new Error("You can't remove incorrect link!");
    }

    let tempArr = this.chain.split('~~');
    tempArr.splice(position - 1, 1);
    this.chain = tempArr.join('~~');
    this.length--;

    return this;
  },
  reverseChain() {
    this.chain = this.chain.split('~~').reverse().join('~~');
    return this;
  },
  finishChain() {
    const result = this.chain;
    this.reset();
    return result;
  },
  reset() {
    this.chain = '';
    this.length = 0;
  },
};

module.exports = {
  chainMaker,
};
