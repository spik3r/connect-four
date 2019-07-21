import {checkColums, checkDiagonals, checkRows, isTie} from "./store";

describe('win logic works', () => {

    it('yellow wins horizontally', () => {
        const gameBoard = [
            ["RED", "YELLOW", "RED"],
            ["YELLOW", "YELLOW"],
            ["YELLOW", "YELLOW"],
            ["YELLOW", "YELLOW"],
            ["RED"],
            ["RED"],
            [],
        ];
        const result = checkRows(gameBoard);
        expect(result).toMatch("YELLOW");
    });

    it('red wins vertically', () => {
        const gameBoard = [
            ["YELLOW"],
            ["RED"],
            ["YELLOW","RED", "RED", "RED", "RED"],
            ["RED"],
            ["YELLOW"],
            ["YELLOW", "YELLOW"],
            [],
        ];
        const result = checkColums(gameBoard);
        expect(result).toMatch("RED");
    });

    it('yellow wins diagonally', () => {
        const gameBoard = [
            ["YELLOW"],
            ["YELLOW"],
            ["RED", "RED"],
            ["RED", "RED", "RED", "YELLOW"],
            ["YELLOW", "RED", "YELLOW"],
            ["RED", "YELLOW"],
            ["YELLOW"],
        ];
        const result = checkDiagonals(gameBoard);
        expect(result).toMatch("YELLOW");
    });


    it('full board has no win and is tie', () => {
        const gameBoard = [
            ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
            ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
            ["RED", "RED", "RED", "YELLOW", "RED", "RED"],
            ["RED", "YELLOW", "YELLOW", "YELLOW", "RED", "YELLOW"],
            ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
            ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
            ["RED", "YELLOW", "RED", "RED", "YELLOW", "RED"],
        ];

        const colResult = checkColums(gameBoard);
        const rowResult = checkRows(gameBoard);
        const diagResult = checkDiagonals(gameBoard);
        const isTieResult = isTie(gameBoard.reduce((count, row) => count + row.length, 0));

        expect(colResult).toBe(false);
        expect(rowResult).toBe(false);
        expect(diagResult).toBe(false);
        expect(isTieResult).toBe(true);
    });
});
