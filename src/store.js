import {createStore} from 'redux';

export const INITIAL_STATE = {
    player: 'YELLOW',
    gameBoard: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ],
    hasWon: false,
    turns: 0,
    lastPiece: {} // improvement if I had more time would be to only search from the last piece for wins
};

const reducer = (state, action) => {
    if (action.type === 'RESET') {
        return INITIAL_STATE;
    }
    // the game loop
    const columnWin = checkColums(state.gameBoard);
    const rowWin = checkRows(state.gameBoard);
    const diagonalWin = checkDiagonals(state.gameBoard);

    if (columnWin) {
        alert(`Player ${columnWin} wins`);
        state.hasWon = true;
    }

    if (rowWin) {
        alert(`Player ${rowWin} wins`);
        state.hasWon = true;
    }

    if (diagonalWin) {
        alert(`Player ${diagonalWin} wins`);
        state.hasWon = true;
    }

    if (shouldKeepPlaying(state) && action.type === 'DROP_DISK') {
        return playNextRound(state, action);
    }

    return state;
};

const shouldKeepPlaying = (state) => {
    if (isTie(state.turns)) {
        alert(`Draw!`);
        return false;
    }

    return !state.hasWon;

};

const playNextRound = (state, action) => {
    const disk = state.player;
    const col = state.gameBoard[action.col].concat(disk);

    const updatedGameBoard = state.gameBoard.slice();
    updatedGameBoard[action.col] = col;
    state.turns++;
    return {
        player: state.player === 'YELLOW' ? 'RED' : 'YELLOW',
        gameBoard: updatedGameBoard,
        hasWon: state.hasWon,
        turns: state.turns
    }
};

export const checkColums = (gameBoard) => {
    for (let row = 0; row <= 6; row++) {
        for (let col = 0; col <= 3; col++) {
            if (gameBoard[row][col] !== undefined) {
                const potentialWinner = gameBoard[row][col];
                if (
                    (gameBoard[row][col + 1] === potentialWinner) &&
                    (gameBoard[row][col + 2] === potentialWinner) &&
                    (gameBoard[row][col + 3] === potentialWinner)) {
                    return potentialWinner;
                }
            }
        }
    }
    return false;
};

export const checkRows = (gameBoard) => {
    for (let col = 0; col <= 6; col++) {
        for (let row = 0; row <= 3; row++) {
            if (gameBoard[row][col] !== undefined) {
                const potentialWinner = gameBoard[row][col];
                if (
                    (gameBoard[row + 1][col] === potentialWinner) &&
                    (gameBoard[row + 2][col] === potentialWinner) &&
                    (gameBoard[row + 3][col] === potentialWinner)) {
                    return potentialWinner;
                }
            }
        }
    }
    return false;
};

export const checkDiagonals = (gameBoard) => {

    for (let col = 0; col <= 4; col++) {
        for (let row = 0; row <= 3; row++) {
            if (gameBoard[row][col] !== undefined) {
                const potentialWinner = gameBoard[row][col];
                if (
                    (gameBoard[row + 1][col + 1] === potentialWinner) &&
                    (gameBoard[row + 2][col + 2] === potentialWinner) &&
                    (gameBoard[row + 3][col + 3] === potentialWinner)) {
                    return potentialWinner;
                }
            }
        }
    }

    for (let col = 0; col <= 4; col++) {
        for (let row = 3; row <= 6; row++) {
            if (gameBoard[row][col] !== undefined) {
                const potentialWinner = gameBoard[row][col];
                if (
                    (gameBoard[row - 1][col + 1] === potentialWinner) &&
                    (gameBoard[row - 2][col + 2] === potentialWinner) &&
                    (gameBoard[row - 3][col + 3] === potentialWinner)) {
                    return potentialWinner;
                }
            }
        }
    }

    return false;
};

export const isTie = (turns) => {
    return turns > 41;
};

export default createStore(reducer, INITIAL_STATE);
