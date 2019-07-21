export const dropDisk = (col, row) => {
    return {
        type: 'DROP_DISK',
        col: col,
        row: row
    };
};

export const resetGame = () => {
    return {
        type: 'RESET',
    };
};