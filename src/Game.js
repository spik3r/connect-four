import React, {Component} from "react";
import './Grid.css';
import Grid from "./Grid";
import {connect} from "react-redux";
import {resetGame} from "./actions";

class Game extends Component {

    clickHandler() {
        document.location.reload();
        this.props.reset();
    }

    render() {
        return (
            <div className="container">
                <h1 className="heading">CONNECT_FOUR</h1>
                <button onClick={() => this.clickHandler()}>Restart</button>
                <Grid className="game-board"/>
            </div>
        );
    }
}

const stateToProps = () => {
    return {};
};

const dispatchToProps = dispatch => {
    return {
        reset: () => dispatch(resetGame()),
    };
};

export default connect(stateToProps, dispatchToProps)(Game);