import { getUniqId } from './utils/id.js'

export function Peace({ type, side, initialSquare }) {
  let currentSquare = initialSquare || false
  const id = side[0] + (type === 'knight' ? 'n' : type[0])
  const uniqId = getUniqId()
  const imageUrl = `https://images.chesscomfiles.com/chess-themes/pieces/bubblegum/150/${id}.png`
  // const imageUrl = `./assets/${side}-${type}.png`

  const elem = createPeace()

  function createPeace() {
    const elem = document.createElement('div')
    elem.classList.add('piece')
    elem.classList.add(id)
    elem.style.backgroundImage = `url(${imageUrl})`

    return elem
  }
  function setCurrentSquare(squareNumber) {
    currentSquare = squareNumber
    elem.setAttribute('square', squareNumber)
    elem.setAttribute('side', side)
  }

  const getColumn = () =>
    currentSquare ? Math.floor(currentSquare / 10) : false
  const getLine = () => (currentSquare ? currentSquare % 10 : false)

  const me = {
    id: uniqId,
    elem,
    getColumn,
    getLine,
    type,
    currentSquare,
    setCurrentSquare,
    side,
  }

  return me
}
