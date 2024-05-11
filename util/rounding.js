function rounding(number) {
  if (number % 10 < 5) {
    return Math.floor(number / 10) * 10;
  } else {
    return Math.ceil(number / 10) * 10;
  }
}
module.exports = rounding;
