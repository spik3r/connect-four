import React, {Component} from "react";
import Cell from "./Cell";
import './Grid.css';

class Grid extends Component {
    makeGrid() {
        const grid = [];
        for (let y = 5; y >= 0; y--) {
            const row = [];
            for (let x = 0; x < 7; x++) {
                row.push(<Cell key={x} x={x} y={y}/>)
            }
            grid.push(<div key={y} className={"row"}>{row}</div>)
        }
        return grid;
    };

    render() {
        return (
            this.makeGrid()
        );
    }
}

export default Grid;