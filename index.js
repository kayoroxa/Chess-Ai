import { Board } from './Board.js'
import { Peace } from './Peace.js'
import { Chess } from './utils/chess.js'
import { letterSquare, numberSquare } from './utils/convertNumberSquare.js'

const myBoard = new Board()

const typePeaces = ['pawn', 'knight', 'rook', 'bishop', 'queen', 'king']
const side = ['white', 'black']

const chess = new Chess()

// chess.load_pgn(`
// 1. d4 d5 2. Nf3 e6 3. g3 c6 4. Bg2 h6 5. O-O a6 6. c4 Nf6 7. Qc2 Bd6 8. c5 Bc7 9. Nc3 O-O 10. e4 Nbd7 11. e5 Ne8 12. Be3 f5 13. exf6 Nexf6 14. Rad1 Re8 15. h3 e5 16. dxe5 Nxe5 17. Nxe5 Bxe5 18. b4 Bxc3 19. Qxc3 Bf5 20. Bd4 Ne4 21. Qb2 Qc7 22. a3 Re7 23. Rde1 Rae8 24. Re3 Qc8 25. Kh2 g5 26. Rfe1 g4 27. h4 h5 28. Kg1 Qd7 29. Qb3 Nd2 30. Rxe7 Rxe7 31. Rxe7 Qxe7 32. Qe3 Qxe3 33. Bxe3 Ne4 34. Bxe4 Bxe4 35. Kf1 Kf7 36. Ke2 Kf6 37. Bd4+ Kf5 38. Ke3 Ke6 39. Kf4 Kd7 40. Kg5 Ke6 41. Kxh5 Bf3 42. Kg5 Kf7 43. h5 Kg8 44. h6 Kh7 45. Bg7 Bd1 46. Kf4 Bf3 47. Ke3 Bd1 48. Kd4 Bf3 49. a4 Be4 50. a5 Bf3 51. Ke3 Be4 52. f4 gxf3 53. Kf2 d4 54. g4 d3 55. Bc3 Kxh6 56. Bd2+ Kg6 57. Kg3 f2 58. g5 f1=Q 59. Kh2 Qf3 60. Bf4 Qg2# {White checkmated} 0-1
// `)

console.log(chess.ascii())

function putPieces() {
  myBoard.reset()
  const board = chess.board()
  for (const [key, linha] of board.entries()) {
    // const indexNumber = 8 - key

    for (const [key2, peace] of linha.entries()) {
      // const indexLetter = key2 + 1

      if (peace) {
        const oi = {
          type: peace.type,
          side: peace.color === 'b' ? 'black' : 'white',
          initialSquare: numberSquare(peace.square),
        }
        myBoard.append(Peace(oi))
      }
    }
  }
}

putPieces()

function newRender() {
  putPieces()
  const number = numberSquare(chess.history({ verbose: true }).slice(-1)[0].to)

  document
    .querySelector('.piece[square="' + number + '"]')
    ?.classList.add('last-selected')

  // document.querySelector('#note').innerHTML = JSON.stringify({
  //   turn: chess.turn(),
  //   fen: chess.fen(),
  // })

  console.log(chess)

  if (chess.game_over()) {
    playSound('start-end')
  }
}

myBoard.on('select', peace => {
  const moves = chess.moves({
    square: peace.currentLetterSquare,
    verbose: true,
  })
  // .map(({ to, san }) => ({ to, san }))

  return moves.map(({ to }) => numberSquare(to))
})

function moveAction(currentLetterSquare, newLetterSquare) {
  const move = chess
    .moves({
      square: currentLetterSquare,
      verbose: true,
    })
    .find(move => move.to === newLetterSquare)

  chess.move({
    from: currentLetterSquare,
    to: newLetterSquare,
  })

  if (move?.san.includes('+')) {
    playSound('check')
  } else if (move?.captured) {
    playSound('capture')
  } else {
    playSound('move')
  }
}

myBoard.on('click-hint', async (peace, newNumberSquare) => {
  const newLetterSquare = letterSquare(newNumberSquare)
  moveAction(peace.currentLetterSquare, newLetterSquare)

  console.log(chess.ascii())
  newRender()

  if (chess.turn() === 'b') {
    await botPlay()
  }
})

function botPlay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('teste')
      const moves = chess.moves({ verbose: true })
      const move = moves[Math.floor(Math.random() * moves.length)]

      moveAction(move.from, move.to)

      newRender()
      resolve()
    }, 1000)
  })
}

function playSound(type /* capture, check, move, start */) {
  const audio = new Audio(`sounds/${type}.mp3`)
  audio.play()
}
