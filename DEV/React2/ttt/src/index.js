import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

class Board extends React.Component {
    handleBoxClick(i){
        this.props.handlerForBoxClick(i);
    }

    renderSquare(i){
        return (
            <button onClick={() => this.handleBoxClick(i)}>{this.props.boxes[i] == null? "": this.props.boxes[i]}</button>
        );
    }

    render() {
        return (
            <div className='board'>
                <div className='title'>
                    Tic Tac Toe
                </div>
                <div className='content'>
                    <div className="ttt">
                        <div className='row'>
                            {this.renderSquare(0)}
                            {this.renderSquare(1)}
                            {this.renderSquare(2)}
                        </div>
                        <div className='row'>
                            {this.renderSquare(3)}
                            {this.renderSquare(4)}
                            {this.renderSquare(5)}
                        </div>
                        <div className='row'>
                            {this.renderSquare(6)}
                            {this.renderSquare(7)}
                            {this.renderSquare(8)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Display extends React.Component {

    moveHistory(i){
        this.props.handlerForHistory(i);
    }
    render() {
        let gameTitle = null;

        if(this.props.gameStatus != null){
            gameTitle = this.props.gameStatus
        } else {
            if(this.props.stepNumber % 2 == 0){
                gameTitle = "Next move for X";
            } else {
                gameTitle = "Next move for O";
            }
        }

        let buttons = [];
        for(let i = 0; i <= this.props.stepNumber; i++){
            let button = null;

            if(i == 0){
                button = (<button onClick={() => this.moveHistory(i)}>Go to Start</button>);
            } else {
                button = (<button onClick={() => this.moveHistory(i)}>Go to step number {i}</button>);
            }

            buttons.push(button);
        }


        return (
            <div className='display'>
                <div className='title'>
                    {gameTitle}
                </div>
                <div className='content'>
                    <div className='history'>
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

class TTT extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            history: [
                [null, null, null, null, null, null, null, null, null],
            ],
            stepNumber: 0,
            gameStatus: null
        }
    }

    handleSquareClick(i){
        let oldHistory = this.state.history.slice();
        let lastStateOfSquares = oldHistory[oldHistory.length - 1].slice();

        if(lastStateOfSquares[i] != null){
            return;
        }

        lastStateOfSquares[i] = this.state.stepNumber % 2 == 0? 'X': 'O';
        oldHistory.push(lastStateOfSquares);

        this.setState({
            history: oldHistory,
            stepNumber: this.state.stepNumber + 1,
            gameStatus: null
        })
    }
    moveToStep(i){
        let oldHistory = this.state.history.slice(0,i+1);

        this.setState({
            history: oldHistory,
            stepNumber :i,
            gameStatus: null
        })
    }

    render() {
        let squares = this.state.history[this.state.history.length - 1];

        return (
            <>
                <Board handlerForBoxClick={(i) => this.handleSquareClick(i)} boxes={squares}/>
                <Display stepNumber={this.state.stepNumber} handlerForHistory={(i) => this.moveToStep(i)}/>
            </>
        );
    }
}

ReactDOM.render(<TTT />, document.getElementById("root"))