const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export function numberSquare(letterSquare) {
  if (letterSquare?.length !== 2) {
    throw new Error('Invalid number square')
  }

  const [myLetter, myNumber] = letterSquare
  return Number(
    `${letters.findIndex(letter => letter === myLetter) + 1}${myNumber}`
  )
}

export function letterSquare(numberSquare) {
  const [myFutureLetter, myNumber] = String(numberSquare)

  return letters[myFutureLetter - 1] + myNumber
}
