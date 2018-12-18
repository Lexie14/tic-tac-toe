import React, { Component } from "react";

class Results extends Component {
  render() {
    let table = [];
    let thead = [];
    let headerRowNames = ["Date", "Time", "Winner", "Total moves"];

    for (let i = 0; i < 1; i++) {
      let headerRow = [];
      for (let j = 0; j < 4; j++) {
        headerRow.push(<th key={headerRowNames[j]}>{headerRowNames[j]}</th>);
      }
      thead.push(<tr key={i + 1}>{headerRow}</tr>);
    }
    table.push(<thead key="thead">{thead}</thead>);

    let body = [];
    for (let i = 0; i < this.props.result.length; i++) {
      let bodyRows = [];
      for (let j = 0; j < 4; j++) {
        bodyRows.push(<td key={j}>{this.props.result[i][j]}</td>);
      }
      body.push(<tr key={i + 2}>{bodyRows}</tr>);
    }
    table.push(<tbody key="tbody">{body}</tbody>);

    return (
      <section className="results">
        <p className="resultsHeader">Results</p>
        <table>{table}</table>
      </section>
    );
  }
}

export default Results;
