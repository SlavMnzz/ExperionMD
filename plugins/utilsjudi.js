/**
 * Detect if that's a number
 * @param {Number} x 
 * @returns Boolean
 */
function number(x = 0) {
    x = parseInt(x);
    return !isNaN(x) && typeof x == 'number';
}

module.exports = { number };