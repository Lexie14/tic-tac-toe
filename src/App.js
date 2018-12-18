import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Header from "./components/header";
import Menu from "./components/menu";
import Game from "./components/game";
import Results from "./components/results";
import "./App.css";
import { FaBug } from "react-icons/fa";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      xPlayer: true,
      time: 30,
      started: false,
      moved: false,
      moves: 0,
      result: [],
      menuOpen: false
    };
  }

  // render X/O when a box on the board is clicked
  handleClick = (box, index) => {
    const board = this.state.board.slice();

    if (this.defineWinner(board) || box !== null) {
      return;
    }

    this.startTimer();
    board[index] = this.state.xPlayer ? "X" : "O";
    this.setState({
      board,
      xPlayer: !this.state.xPlayer,
      moved: true,
      moves: this.state.moves + 1,
      winner: board[index]
    });

    if (this.defineWinner(board)) {
      setTimeout(() => {
        this.getResults();
      }, 0);
      this.resetTimer();
    }
  };

  // get final result of the game
  getResults = () => {
    let result = [];
    let date = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    let time = new Date().toTimeString().split(" ")[0];
    let winner = this.state.winner;
    let moves = this.state.moves;
    result = result.concat([date, time, winner, moves]);
    this.setState({
      result: this.state.result.concat([result]),
      moves: 0
    });
  };

  resetTimer = () => {
    clearInterval(this.myInterval);
    this.setState({
      time: 30
    });
  };

  startTimer = () => {
    this.resetTimer();
    this.myInterval = setInterval(() => {
      this.setState({
        time: this.state.time - 1
      });
      if (this.state.time === 0) {
        this.setState({
          time: 30,
          xPlayer: !this.state.xPlayer
        });
        return;
      }
    }, 1000);
  };

  defineWinner = board => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winCombinations.length; i++) {
      let [a, b, c] = winCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  startGame = () => {
    this.setState({
      started: true
    });
  };

  resetGame = () => {
    this.resetTimer();
    this.setState({
      board: Array(9).fill(null),
      xPlayer: true,
      moved: false
    });
  };

  toggleMenu = () => {
    this.setState(prevState => {
      return { menuOpen: !prevState.menuOpen };
    });
  };

  render() {
    let menuOpen;
    if (this.state.menuOpen) {
      menuOpen = <Menu />;
    }

    return (
      <HashRouter>
        <section className="app">
          <Header toggleMenu={this.toggleMenu} />
          <main className="main">
            {menuOpen}
            <Menu menuOpen={this.state.menuOpen} />
            <section className="content">
              <Route
                exact
                path="/"
                render={props => (
                  <Game
                    {...props}
                    handleClick={this.handleClick}
                    startGame={this.startGame}
                    resetGame={this.resetGame}
                    defineWinner={this.defineWinner}
                    state={this.state}
                  />
                )}
              />
              <Route
                path="/results"
                render={props => (
                  <Results {...props} result={this.state.result} />
                )}
              />
              <footer className="footer">
                <p className="footerText">
                  Created by Lexie
                  <span className="bug">
                    <FaBug />
                  </span>
                </p>
              </footer>
            </section>
          </main>
        </section>
      </HashRouter>
    );
  }
}

export default App;
