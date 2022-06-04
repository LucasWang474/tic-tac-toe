import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


const Square = ({id, value, onClick}) => {
    return (
        <button className="square" onClick={() => onClick(id)}>
            {value}
        </button>
    );
};

class Board extends React.Component {
    renderSquare(id) {
        return <Square
            id={id}
            value={this.props.squares[id]}
            onClick={this.props.onClick}
        />;
    }
    
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            history: [
                {
                    nextPlayer: 'X',
                    squares: Array(9).fill(''),
                    hasWinner: false,
                }
            ],
            curStepNum: 0,
        };
    }
    
    jumpTo(stepNum) {
        this.setState({
            curStepNum: stepNum,
        });
    }
    
    updateHistory(step) {
    
    }
    
    updateSquare = (id) => {
        const lastStep = this.state.history[this.state.curStepNum];
        if (lastStep.hasWinner || lastStep.squares[id]) {
            return;
        }
        
        const squares = lastStep.squares.slice();
        squares[id] = lastStep.nextPlayer;
        const nextPlayer = lastStep.nextPlayer === 'X' ? 'O' : 'X';
        this.setState({
            history: this.state.history.slice(0, this.state.curStepNum + 1).concat([{
                squares,
                nextPlayer,
                hasWinner: Boolean(calculateWinner(squares)),
            }]),
            curStepNum: this.state.curStepNum + 1,
        });
    };
    
    getStatus() {
        const lastStep = this.state.history[this.state.curStepNum];
        if (lastStep.hasWinner) {
            const winner = lastStep.nextPlayer === 'X' ? 'O' : 'X';
            return 'Winner: ' + winner;
        } else {
            return 'Next player: ' + lastStep.nextPlayer;
        }
    }
    
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={this.updateSquare}
                        squares={this.state.history[this.state.curStepNum].squares}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{this.getStatus()}</div>
                    
                    <ol>
                        <li>
                            <button onClick={() => this.jumpTo(0)}>
                                Go to game start
                            </button>
                        </li>
                        
                        {
                            this.state.history.slice(1).map((step, stepNum) => {
                                return (
                                    <li key={stepNum}>
                                        <button onClick={() => this.jumpTo(stepNum)}>
                                            Go to move #{stepNum}
                                        </button>
                                    </li>
                                );
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><Game/></React.StrictMode>);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
