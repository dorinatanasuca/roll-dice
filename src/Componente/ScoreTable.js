import React from "react";
import "./ScoreTable.css";

const ScoreTable = ({ playerName, diceRolls }) => {
  const totalRolls = diceRolls.length;
  let totalDice = [];
  let totalRow = null;

  if (totalRolls >= 5) {
    // Calculate the total sum of all dice rolls
    totalDice = diceRolls.reduce((acc, curr) => {
      return acc.concat(curr.diceNumber);
    }, []);

    const totalSum = totalDice.reduce((acc, curr) => acc + curr, 0);

    // Create the total row
    totalRow = (
      <tr>
        <td>Total</td>
        <td>{totalSum}</td>
      </tr>
    );
  }

  return (
    <div className="score-table">
      <h3>{playerName}'s Score</h3>
      <table>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {diceRolls.map((roll, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{roll.diceNumber.join(", ")}</td>
            </tr>
          ))}
          {totalRow}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
