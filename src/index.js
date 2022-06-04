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
    constructor(props) {
        super(props);
        
        this.state = {
            nextPlayer: 'X',
            squares: Array(9).fill(''),
            hasWinner: false,
        };
    }
    
    renderSquare(id) {
        return <Square
            id={id}
            value={this.state.squares[id]}
            onClick={this.updateSquare}
        />;
    }
    
    updateSquare = (id) => {
        if (this.state.hasWinner || this.state.squares[id]) {
            return;
        }
        
        const squares = this.state.squares.slice();
        squares[id] = this.state.nextPlayer;
        this.setState({
            squares,
            nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X',
            hasWinner: Boolean(calculateWinner(squares)),
        });
    };
    
    getStatus() {
        if (this.state.hasWinner) {
            const winner = this.state.nextPlayer === 'X' ? 'O' : 'X';
            return 'Winner: ' + winner;
        } else {
            return 'Next player: ' + this.state.nextPlayer;
        }
    }
    
    render() {
        return (
            <div>
                <div className="status">{this.getStatus()}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <ol>{/* TODO */}</ol>
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
