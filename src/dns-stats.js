const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const dnsStats = {};
  const splittedDomains = domains.map((i) => i.split('.').reverse());

  for (const domain of splittedDomains) {
    let dns = '';
    domain.forEach((i) => {
      dns += `.${i}`;
      dnsStats[dns] = (dnsStats[dns] ?? 0) + 1;
    });
  }

  return dnsStats;
}

module.exports = {
  getDNSStats,
};
