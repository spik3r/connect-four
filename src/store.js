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
        console.log(`Player ${columnWin} wins`);
        alert(`Player ${columnWin} wins`);
        state.hasWon = true;
    }

    if (rowWin) {
        console.log(`Player ${rowWin} wins`);
        alert(`Player ${rowWin} wins`);
        state.hasWon = true;
    }

    if (diagonalWin) {
        console.log(`Player ${diagonalWin} wins`);
        alert(`Player ${diagonalWin} wins`);
        state.hasWon = true;
    }

    if (shouldKeepPlaying(state) && action.type === 'DROP_DISK') {
        return playNextRound(state, action);
    }

    return state;
};

const shouldKeepPlaying = (state) => {
    if (state.turns >= 42) {
        console.log(`Draw!`);
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
    for (let row = 5; row >= 0; row--) {
        // let yellowConsecutive = 0;
        // let redConsecutive = 0;
        for (let col = 0; col <= 6; col++) {
            if (gameBoard[row][col] !== undefined) {
                const potentialWinner = gameBoard[row][col];
                if (
                    (gameBoard[row][col + 1] === potentialWinner) &&
                    (gameBoard[row][col + 2] === potentialWinner) &&
                    (gameBoard[row][col + 3] === potentialWinner)) {
                    return potentialWinner;
                }
            }

            // if (gameBoard[row][col] === "YELLOW") {
            //     yellowConsecutive++;
            //     redConsecutive = 0;
            //     if (yellowConsecutive === 4) {
            //         return "YELLOW";
            //     }
            // }
            // if (gameBoard[row][col] === "RED") {
            //     redConsecutive++;
            //     yellowConsecutive = 0;
            //     if (redConsecutive === 4) {
            //         return "RED";
            //     }
            // }
        }
    }
    return false;
};

export const checkRows = (gameBoard) => {
    for (let col = 0; col <= 6; col++) {
        // let yellowConsecutive = 0;
        // let redConsecutive = 0;
        for (let row = 5; row >= 0; row--) {
            if (gameBoard[row][col] !== undefined) {
                const potentialWinner = gameBoard[row][col];
                if (
                    (gameBoard[row + 1][col] === potentialWinner) &&
                    (gameBoard[row + 2][col] === potentialWinner) &&
                    (gameBoard[row + 3][col] === potentialWinner)) {
                    return potentialWinner;
                }
            }

            // if (gameBoard[row][col] === "YELLOW") {
            //     yellowConsecutive++;
            //     redConsecutive = 0;
            //     if (yellowConsecutive === 4) {
            //         return "YELLOW";
            //     }
            // }
            //
            // if (gameBoard[row][col] === "RED") {
            //     redConsecutive++;
            //     yellowConsecutive = 0;
            //     if (redConsecutive === 4) {
            //         return "RED";
            //     }
            // }
        }
    }
    return false;
};

export const checkDiagonals = (gameBoard) => {

    //Bottom Left to Top Right
    for (let col = 0; col <= 6; col++) {
        for (let row = 0; row <= 5; row++) {
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

    //Top Left to Bottom Right
    for (let col = 0; col <= 6; col++) {
        for (let row = 3; row <= 5; row++) {
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

export default createStore(reducer, INITIAL_STATE);
