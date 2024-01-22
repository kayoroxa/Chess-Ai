function countDown(number, number2) {
  if (number > 0) {
    return countDown(number - 1, number2)
  } else {
    console.log(number)
    return number
  }
}

countDown(5, 2)
