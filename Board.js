import { Moves } from './moves.js'

const boardHtml = document.querySelector('.board')
const { getMovesFrom } = Moves({})

let peaceSelectedId = false

function removeHints() {
  const allHints = document.querySelectorAll('.hint')
  allHints.forEach(hint => {
    hint.classList.remove('hint')
  })
}

function removeAllSelected(elem) {
  const peaces = document.querySelectorAll('.piece.selected')
  peaces.forEach(peace => {
    if (elem && peace === elem) return
    peace.classList.remove('selected')
  })
  removeHints()
}

export function Board() {
  const allPeaces = []

  // function getPlacesOcupied() {
  //   const intries = allPeaces.map(peace => [peace.currentSquare, peace])
  //   const obj = intries.reduce((obj, [key, value]) => {
  //     obj[key] = value
  //     return obj
  //   }, {})
  //   return obj
  // }

  function showPath(arrayNumbersSquare, myselfExcludeNumberSquare) {
    // getPlacesOcupied()
    removeHints()

    arrayNumbersSquare = arrayNumbersSquare.filter(
      numberSquare => numberSquare !== myselfExcludeNumberSquare && numberSquare
    )

    function createHint(numberSquare, different = false) {
      const hint = document.createElement('div')
      hint.classList.add('hint')
      if (different) {
        hint.classList.add('capture')
      } else {
        hint.classList.add('move')
      }
      hint.setAttribute('square', numberSquare)
      boardHtml.append(hint)
      onClickHint(hint)
    }

    const mePeace = allPeaces.find(peace => peace.id === peaceSelectedId)

    arrayNumbersSquare.forEach(numberSquare => {
      const findPeaceIntersection = allPeaces.find(peace => {
        return peace.currentSquare === numberSquare
      })

      const isOppositeSide =
        findPeaceIntersection && findPeaceIntersection.side !== mePeace.side

      if (findPeaceIntersection && isOppositeSide) {
        createHint(numberSquare, true)
      } else if (!findPeaceIntersection) {
        createHint(numberSquare)
      }
    })
  }

  function putInSquare(peaceId, numberNewSquare) {
    const peace = allPeaces.find(peace => peace.id === peaceId)

    peace.setCurrentSquare(numberNewSquare)
    // peace.currentSquare = numberNewSquare
    // peace.setAttribute('square', numberNewSquare)
  }

  function clientMove(peaceId, numberNewSquare) {
    putInSquare(peaceId, numberNewSquare)
  }

  function possiblesSquare() {}

  function onClickPeace(peace) {
    const elem = peace.elem

    elem.onclick = () => {
      removeAllSelected(elem)
      elem.classList.toggle('selected')

      if (elem.classList.contains('selected')) {
        peaceSelectedId = peace.id
        const othersPeace = allPeaces.filter(
          peace => peace.id !== peaceSelectedId
        )
        showPath(
          getMovesFrom({
            column: peace.getColumn(),
            line: peace.getLine(),
            type: peace.type,
            side: peace.side,
            squareNumbersInUse: othersPeace.map(peace => peace.currentSquare),
          }),
          peace.currentSquare
        )
      } else {
        removeHints()
      }
    }
  }

  function onClickHint(hintElemHtml) {
    hintElemHtml.onclick = () => {
      const currentSquare = Number(hintElemHtml.getAttribute('square'))
      const peace = allPeaces.find(peace => peace.id === peaceSelectedId)
      peace.currentSquare = currentSquare
      clientMove(peace.id, currentSquare)
      removeAllSelected()
    }
  }

  function append(peace) {
    allPeaces.push(peace)
    onClickPeace(peace)
    clientMove(peace.id, peace.currentSquare)
    boardHtml.append(peace.elem)
  }

  return {
    showPath,
    removeHints,
    append,
  }
}
