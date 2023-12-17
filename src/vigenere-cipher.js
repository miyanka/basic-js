const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    return this.transform(message, key, 'encrypt');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');

    return this.transform(encryptedMessage, key, 'decrypt');
  }

  transform(message, key, type) {
    const shifts = [...key.toUpperCase()].map((letter) =>
      this.alphabet.indexOf(letter)
    );
    let shiftIndex = 0;

    const transformedLetters = [...message.toUpperCase()]
      .map((letter) => {
        const alphabetIndex = this.alphabet.indexOf(letter);
        if (alphabetIndex === -1) return null;

        shiftIndex =
          shiftIndex < shifts.length ? shiftIndex : shiftIndex % shifts.length;
        const newAlphabetIndex =
          type === 'encrypt'
            ? alphabetIndex + shifts[shiftIndex]
            : alphabetIndex - shifts[shiftIndex];
        shiftIndex++;
        return newAlphabetIndex;
      })
      .map((item, index) => {
        if (item === null) return message[index];

        const alphabetIndex =
          type === 'decrypt' || item < this.alphabet.length
            ? item
            : item % this.alphabet.length;
        return this.alphabet.at(alphabetIndex);
      });

    if (!this.direct) {
      transformedLetters.reverse();
    }
    return transformedLetters.join('');
  }
}

module.exports = {
  VigenereCipheringMachine,
};
