import { Board } from './Board.js'
import { Peace } from './Peace.js'

const myBoard = new Board()

const typePeaces = ['pawn', 'knight', 'rook', 'bishop', 'queen', 'king']
const side = ['white', 'black']

myBoard.append(Peace({ type: 'king', side: 'black', initialSquare: 46 }))
myBoard.append(Peace({ type: 'pawn', side: 'black', initialSquare: 67 }))
myBoard.append(Peace({ type: 'rook', side: 'white', initialSquare: 64 }))
myBoard.append(Peace({ type: 'pawn', side: 'white', initialSquare: 26 }))
myBoard.append(Peace({ type: 'queen', side: 'white', initialSquare: 36 }))
myBoard.append(Peace({ type: 'bishop', side: 'white', initialSquare: 44 }))
myBoard.append(Peace({ type: 'knight', side: 'white', initialSquare: 11 }))
