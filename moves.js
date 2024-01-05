function Presets(squareNumbersInUse, curColumn, curLine) {
  function s(column, line, filter = true) {
    if (column > 8 || line > 8 || column < 1 || line < 1) {
      return false
    }
    const newSquare = Number(String(column) + String(line))
    if (filter && squareNumbersInUse.includes(newSquare)) {
      return false
    }

    return Number(String(column) + String(line))
  }

  function allColumn(column) {
    const squares = []

    // Up
    for (let lineIndex = curLine + 1; lineIndex <= 8; lineIndex++) {
      const square = s(column, lineIndex, false)
      if (squareNumbersInUse.includes(square)) {
        squares.push(square) // PeaceIntersection
        break
      }
      squares.push(square)
    }

    // Down
    for (let lineIndex = curLine - 1; lineIndex >= 1; lineIndex--) {
      const square = s(column, lineIndex, false)
      if (squareNumbersInUse.includes(square)) {
        squares.push(square)
        break
      }
      squares.push(square)
    }

    return squares
  }

  function allLine(line) {
    const squares = []
    //left
    for (let columnIndex = curColumn + 1; columnIndex <= 8; columnIndex++) {
      const square = s(columnIndex, line, false)
      if (squareNumbersInUse.includes(square)) {
        squares.push(square)
        break
      }
      squares.push(square)
    }

    //right

    for (let columnIndex = curColumn - 1; columnIndex >= 1; columnIndex--) {
      const square = s(columnIndex, line, false)
      if (squareNumbersInUse.includes(square)) {
        squares.push(square)
        break
      }
      squares.push(square)
    }

    return squares
  }

  function allDiagonal(column, line) {
    const diagonals = []

    // Diagonais right top
    for (let i = 1; i <= 8; i++) {
      const diagonal = s(column + i, line + i, false)
      if (diagonal && !squareNumbersInUse.includes(diagonal)) {
        diagonals.push(diagonal)
      } else {
        diagonals.push(diagonal)
        break // Se não há mais casas válidas na diagonal, pare o loop
      }
    }

    // Diagonais left top
    for (let i = 1; i <= 8; i++) {
      const diagonal = s(column - i, line + i, false)
      if (diagonal && !squareNumbersInUse.includes(diagonal)) {
        diagonals.push(diagonal)
      } else {
        diagonals.push(diagonal)
        break // Se não há mais casas válidas na diagonal, pare o loop
      }
    }

    // Diagonais right bottom
    for (let i = 1; i <= 8; i++) {
      const diagonal = s(column + i, line - i, false)
      if (diagonal && !squareNumbersInUse.includes(diagonal)) {
        diagonals.push(diagonal)
      } else {
        diagonals.push(diagonal)
        break // Se não há mais casas válidas na diagonal, pare o loop
      }
    }

    // Diagonais left bottom
    for (let i = 1; i <= 8; i++) {
      const diagonal = s(column - i, line - i, false)
      if (diagonal && !squareNumbersInUse.includes(diagonal)) {
        diagonals.push(diagonal)
      } else {
        diagonals.push(diagonal)
        break // Se não há mais casas válidas na diagonal, pare o loop
      }
    }

    return diagonals
  }

  return {
    allColumn,
    allLine,
    allDiagonal,
    s,
  }
}

export function Moves({}) {
  function getMovesFrom({ type, column, line, side, squareNumbersInUse }) {
    const { allColumn, allLine, allDiagonal, s } = Presets(
      squareNumbersInUse,
      column,
      line
    )
    const dict = {
      pawn: [
        //
        side === 'white' ? s(column, line + 1) : s(column, line - 1),
      ],
      knight: [
        //
        s(column + 2, line - 1),
        s(column + 2, line + 1),
        s(column - 2, line - 1),
        s(column - 2, line + 1),
        s(column + 1, line - 2),
        s(column + 1, line + 2),
        s(column - 1, line - 2),
        s(column - 1, line + 2),
      ],
      rook: [
        //
        ...allColumn(column),
        ...allLine(line),
      ],
      bishop: [
        //
        ...allDiagonal(column, line),
      ],
      queen: [
        //
        ...allColumn(column),
        ...allLine(line),
        ...allDiagonal(column, line),
      ],
      king: [
        //
        s(column, line + 1),
        s(column, line - 1),
        s(column + 1, line),
        s(column - 1, line),
        s(column + 1, line + 1),
        s(column + 1, line - 1),
        s(column - 1, line + 1),
        s(column - 1, line - 1),
      ],
    }
    return dict[type]
  }

  return {
    getMovesFrom,
  }
}
