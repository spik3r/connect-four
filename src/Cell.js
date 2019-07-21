import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Cell.css';
import {dropDisk} from "./actions";

class Cell extends Component {
    clickHandler() {
        console.log("clicked on: " + this.props.x);
        this.props.dropNextDisk(this.props.x, this.props.y);
    }

    render() {

        const cellClass = getCellColor(this.props.gameBoard, this.props.x, this.props.y);


        return (
            <div className={`${cellClass}`} onClick={() => this.clickHandler()}>
                <p>{this.props.x}, {this.props.y}</p>
            </div>
        );
    }
}

const getCellColor = (gameBoard, x, y) => {
    if(gameBoard[x][y] !== undefined) {
        console.log("gb[x][x]: " + gameBoard[x][y]);
        if (gameBoard[x][y] === "YELLOW") {
            return "cell yellow-disk"
        } return "cell red-disk"
    } return "cell"
};

const stateToProps = state => {
    return {
        gameBoard: state.gameBoard
    };
};

const dispatchToProps = dispatch => {
    return {
        dropNextDisk: (col, row) => dispatch(dropDisk(col, row)),
    };
};

export default connect(stateToProps, dispatchToProps)(Cell);