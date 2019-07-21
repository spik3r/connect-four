import {checkColums, checkDiagonals, checkRows} from "./store";

describe('win logic works', () => {

    it('jest works', () => {
        expect(2 + 3).toBe(5);
    });

    it('empty board has no win', () => {
        const gameBoard = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ];

        const colResult = checkColums(gameBoard);
        const rowResult = checkRows(gameBoard);
        const diagResult = checkDiagonals(gameBoard);

        expect(colResult).toBe(false);
        expect(rowResult).toBe(false);
        expect(diagResult).toBe(false);
    });

    it('should detect row win', () => {
        const gameBoard = [
            ["YELLOW", "RED"],
            ["YELLOW"],
            ["YELLOW"],
            ["YELLOW"],
            ["RED"],
            ["RED"],
            [],
        ];
        const result = checkRows(gameBoard);
        expect(result).toMatch("YELLOW");
    });

    it('should detect column win', () => {
        const gameBoard = [
            ["YELLOW"],
            ["YELLOW"],
            ["YELLOW"],
            ["RED", "RED", "RED", "RED"],
            ["YELLOW"],
            ["YELLOW"],
            [],
        ];
        const result = checkColums(gameBoard);
        expect(result).toMatch("RED");
    });

    it('should detect bottom left to top right diagonal win', () => {
        const gameBoard = [
            ["YELLOW"],
            ["RED", "YELLOW"],
            ["YELLOW", "RED", "YELLOW"],
            ["RED", "RED", "RED", "YELLOW"],
            ["YELLOW"],
            ["YELLOW"],
            ["RED", "RED"],
        ];
        const result = checkDiagonals(gameBoard);
        expect(result).toMatch("YELLOW");
    });

    it('should detect top left to bottom right diagonal win', () => {
        const gameBoard = [
            ["RED", "RED", "RED", "YELLOW"],
            ["YELLOW", "RED", "YELLOW"],
            ["RED", "YELLOW"],
            ["YELLOW"],
            ["YELLOW"],
            ["RED", "RED"],
            ["YELLOW"],
        ];
        const result = checkDiagonals(gameBoard);
        expect(result).toMatch("YELLOW");
    });

});
