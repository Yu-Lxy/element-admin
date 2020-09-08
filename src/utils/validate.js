/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// /^[1-9][0-9]{0,4}(\.[0-9]{1,2})?$/.test(99999.99)
export function priceFloatReg(num) {
  // return new RegExp("^(?!0$)([1-9][0-9]{0," + (num - 1) + "}|0)(\.(?![0]{1,2}$)[0-9]{1,2})?$")
  return new RegExp("^(?!0$)([1-9][0-9]{0," + (num - 1) + "}|0)(\\.(?![0]{1,2}$)[0-9]{1,2})?$")
  // return new RegExp("^[1-9][0-9]{0,"+(num-1)+"}(\\.[0-9]{1,2})?$")
}
export function priceIntegerReg(num) {
  return new RegExp("^[1-9][0-9]{0,"+(num-1)+"}$")
}
