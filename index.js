import { Board } from './Board.js'
import { Peace } from './Peace.js'
import { Chess } from './utils/chess.js'
import { letterSquare, numberSquare } from './utils/convertNumberSquare.js'

const myBoard = new Board()

const typePeaces = ['pawn', 'knight', 'rook', 'bishop', 'queen', 'king']
const side = ['white', 'black']

const chess = new Chess()

let pgn = `
1. d4 d5 2. c4 e6 3. Nc3 c5 {[pgndiagram] The Tarrasch! Capa wasn't afraid of
the isolated pawn back in the day} 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Be6 (6... Nf6
{Is the main move nowadays, not deciding where to put the light squared bishop
yet} 7. Bg2 Be7 8. O-O O-O 9. b3 Bg4 {The point is that in some variations
Black can take more flexible approach and develop on g4 instead}) 7. Bg2 Be7 8.
O-O Nf6 9. Bg5 {[pgndiagram] The players have transposed into mainline
nevertheless} (9. dxc5 Bxc5 10. b3 O-O 11. Bb2) 9... Ne4 $2 {This move shows
that such dynamic positions were pretty revolutionary for those times} (9... c4
) (9... O-O) 10. Bxe7 Qxe7 11. Ne5 $2 {[pgndiagram] And here Kasparov's
comment is priceless: "A typical Marshall way of trying to initiate some
tactics out of nothing"} (11. dxc5 {Was simple and good. After} Nxc3 12. bxc3
Qxc5 13. Rb1 b6 14. Ng5 {White has extremely pleasant position}) 11... Nxd4 {
A cold shower. Capa simplifies the position} (11... Nxe5 12. Nxe4 dxe4 13. dxe5
{Would be for instance in Marshall's favour}) 12. Nxe4 dxe4 13. e3 Nf3+ {
Another good decision. Capa decides to give up a pawn on e4 in this way, and
as a result he will have a 3-2 pawn majority on the queenside} (13... Nc6 14.
Nxc6 bxc6 15. Bxe4 {Is of course terrible}) 14. Nxf3 exf3 15. Qxf3 O-O {
[pgndiagram] It is time to pause for a moment. The position should be dead
equal; with the great number of the pieces on the board, the pawn majority of
the queenside shouldn't be regarded as an advantage per se. However, under the
influence of this games, for quite some time it has been regarded that
queenside pawn majority brings automatic advantage} 16. Rfc1 (16. Qxb7 {Would
of course be terrible due to} Qxb7 17. Bxb7 Rab8 18. Bf3 Rxb2 {And Black has a
sizeable advantage}) (16. Rfd1 {Grabbing an open file, was also logical}) 16...
Rab8 17. Qe4 Qc7 {Capa intends to push his pawns} 18. Rc3 $2 {And this is the
first move of questonable value. It is not clear what White hopes to achieve
by doubling on the semi open c-file} (18. Rd1 {Is perfectly logical} Rfd8 19.
a3 b5 20. Qc2 c4 21. Be4 {And White has nothing to fear}) 18... b5 19. a3 $6 (
19. b3 {Reducing the effect of c4, was better, and more consistent with the
previous move} c4 20. bxc4 bxc4 21. Bf1) 19... c4 {[pgndiagram] Now suddenly
White has an unpleasant position} 20. Bf3 $2 {Again showing indifference
toward the d-file} (20. Rd1 Rfd8 21. Rcc1 a5 {And still, White should be able
to defend after} 22. Rd4) 20... Rfd8 21. Rd1 Rxd1+ 22. Bxd1 Rd8 23. Bf3 g6 {
[pgndiagram] Now White's pieces are not coordinated and Black enjoys activity}
24. Qc6 $2 {Another suboptimal move.} Qe5 $1 25. Qe4 {There is now nothing
better} (25. Kg2 Rd2) 25... Qxe4 {Now, after queen exchange, b5 will not be
attacked, so Black should go for the exchange} 26. Bxe4 Rd1+ 27. Kg2 a5 {
[pgndiagram] The game is almost over; Black's queenside pawn majority will
soon come crashing through. It is amazing how quickly Marshall, a top 10
player, lost his way in a seemingly harmless position} 28. Rc2 b4 29. axb4 (29.
h4 {Would be met by} b3 30. Re2 c3 31. bxc3 Ra1 {And wins}) 29... axb4 30. Bf3
Rb1 31. Be2 (31. Rd2 {Would come to very similar things} b3 32. Be2 Rc1 33. Bd1
(33. Kf3 Rc2) 33... c3 34. bxc3 b2 {As in the game}) 31... b3 32. Rd2 Rc1 33.
Bd1 c3 34. bxc3 b2 35. Rxb2 Rxd1 {[pgndiagram] Capa wins the piece and with it
the game. Marshall could have resigned here, but back in the day resigning
wasn't done as easily as today} 36. Rc2 Bf5 37. Rb2 Rc1 38. Rb3 Be4+ 39. Kh3
Rc2 40. f4 h5 41. g4 hxg4+ 42. Kxg4 Rxh2 43. Rb4 f5+ 44. Kg3 Re2 45. Rc4 Rxe3+
46. Kh4 Kg7 47. Rc7+ Kf6 48. Rd7 Bg2 49. Rd6+ Kg7 {[pgndiagram] An impressive
game, which had a massive influence on many subsequent generations of the
chess players.} 0-1
`

let pgnModificado = new Chess()
pgnModificado.load_pgn(pgn)

pgn = pgnModificado.history()

// pgn = pgn.match(/\b[a-z]{1,2}\d\#?\+?|O-O/gim)

console.log(pgn)
let jogadas = 0
let loss = 0
const userColor = 'b'

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

  // document
  //   .querySelector('.piece[square="' + number + '"]')
  //   ?.classList.add('last-selected')

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
  jogadas++
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

  newRender()
  nextMoveOpponent()
}

document.querySelector('#note').innerHTML = JSON.stringify({ loss })

function checkPuzzlePlay(currentLetterSquare, newLetterSquare) {
  return chess
    .moves({
      square: currentLetterSquare,
      verbose: true,
    })
    .find(move => move.to === newLetterSquare && pgn[jogadas] === move.san)
}

const tipsLetterSquare = chess
  .moves({ verbose: true })
  .find(move => pgn[jogadas] === move.san)?.from

if (!tipsLetterSquare) {
  console.log(tipsLetterSquare)
}

nextMoveOpponent()

function nextMoveOpponent() {
  if (chess.turn() === userColor) {
    const tipsLetterSquare = chess
      .moves({ verbose: true })
      .find(move => pgn[jogadas] === move.san)?.from

    if (!tipsLetterSquare) {
      console.log(tipsLetterSquare)
    }
    document
      .querySelector(".piece[square='" + numberSquare(tipsLetterSquare) + "']")
      .classList.add('tips')
  } else {
    botPlay()
  }
}

myBoard.on('click-hint', async (peace, newNumberSquare) => {
  const newLetterSquare = letterSquare(newNumberSquare)
  const sim = checkPuzzlePlay(peace.currentLetterSquare, newLetterSquare)

  if (!sim) {
    loss++
    document.querySelector('#note').innerHTML = JSON.stringify({ loss })
    myBoard.removeAllSelected()
    return
  }

  moveAction(peace.currentLetterSquare, newLetterSquare)

  console.log(chess)
  console.log(chess.ascii())
})

function botPlay() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('teste')
      const moves = chess.moves({ verbose: true })
      const move = moves.find(move => pgn[jogadas] === move.san)
      // const move = moves[Math.floor(Math.random() * moves.length)]

      moveAction(move.from, move.to)
      resolve()
    }, 400)
  })
}

function playSound(type /* capture, check, move, start */) {
  const audio = new Audio(`sounds/${type}.mp3`)
  audio.play()
}
