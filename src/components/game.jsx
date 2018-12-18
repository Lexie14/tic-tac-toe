import React, { Component } from "react";

class Game extends Component {
  render() {
    let state = this.props.state;
    let started = state.started;
    let moved = state.moved;
    const winner = this.props.defineWinner(state.board);
    let info;
    let player;
    if (winner) {
      info = "Winner is " + winner + "!";
    } else {
      player = state.xPlayer ? "X" : "O";
    }

    const xsource = require("../images/x.png");
    const osource = require("../images/o.png");

    return (
      <section className="game">
        {!started ? (
          <button onClick={this.props.startGame} className="startButton">
            Start
          </button>
        ) : (
          <section>
            <section className="info">
              <p>{info}</p>
              {!winner && (
                <p>
                  Player<span className="player">{player}</span>moves
                </p>
              )}
              {!winner && moved && (
                <p>
                  You have<span className="seconds">{state.time}</span>seconds
                  to make a move
                </p>
              )}
            </section>
            <section className="board">
              {state.board.map((box, index) => (
                <section
                  key={index}
                  className="box"
                  onClick={() => this.props.handleClick(box, index)}
                >
                  {box === "X" && <img src={xsource} alt="x" />}
                  {box === "O" && <img src={osource} alt="o" />}
                </section>
              ))}
              <button onClick={this.props.resetGame} className="resetButton">
                Reset
              </button>
            </section>
          </section>
        )}
      </section>
    );
  }
}

export default Game;

// import React, { Component } from "react";

// class Board extends Component {
//   render() {
//     const xsource = require("./x.png");
//     const osource = require("./o.png");
//     return (
//       <section className="board">
//         {this.props.board.map((box, index) => (
//           <section
//             key={index}
//             className="box"
//             onClick={() => this.props.handleClick(box, index)}
//           >
//             {box === "X" && <img src={xsource} alt="x" />}
//             {box === "O" && <img src={osource} alt="o" />}
//           </section>
//         ))}
//       </section>
//     );
//   }
// }

// export default Board;
