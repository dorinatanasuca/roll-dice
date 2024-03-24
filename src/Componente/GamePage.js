import React, { useEffect, useState } from "react";
import MenuDrop from "./MenuDrop";
import Zaruri from "./Zaruri";
import ScoreTable from "./ScoreTable";
import "./GamePage.css";

const GamePage = ({ onReturn }) => {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [player1Rolls, setPlayer1Rolls] = useState([]);
  const [player2Rolls, setPlayer2Rolls] = useState([]);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [showResetButton, setShowResetButton] = useState(false);

  const handlePlayer1DiceChange = (newNumberOfDice) => {
    setNumberOfDice(newNumberOfDice);
  };

  const handlePlayer2DiceChange = (newNumberOfDice) => {
    setNumberOfDice(newNumberOfDice);
  };

  console.log(player1Rolls, "player 1 roll");

  const handleReturn = () => {
    onReturn();
  };

  const handleRollDice = (playerName, diceValues) => {
    console.log("handle dice roll");
    const rollDetails = {
      roll: diceValues,
      diceNumber: diceValues,
    };

    if (playerName === "Player 1") {
      setPlayer1Rolls((prevRolls) => [...prevRolls, rollDetails]);
    } else if (playerName === "Player 2") {
      setPlayer2Rolls((prevRolls) => [...prevRolls, rollDetails]);
    }
  };

  const resetGame = () => {
    setPlayer1Rolls([]);
    setPlayer2Rolls([]);
    setShowResetButton(false);
  };

  useEffect(() => {
    console.log("USE EFFECT WORKING", player1Rolls.length, player2Rolls.length)
    if (player1Rolls.length >= 5 && player2Rolls.length >= 5) {
      console.log("show reset button");
      setShowResetButton(true);
    }
  }, [player1Rolls.length, player2Rolls.length]);

  const handleAnimationEnd = (playerName, diceValues) => {
    console.log(`Animation ended for ${playerName}. Dice values:`, diceValues);
  };

  return (
    <div>
      <div className="game-page">
        <div className="players-container">
          <div className="player-container">
            <h2>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
            </h2>
            <Zaruri
              player="1"
              numberOfDice={numberOfDice}
              onRollDice={(diceValues) => {
                handleRollDice(player1Name, diceValues);
              }}
              onAnimationEnd={(diceValues) =>
                handleAnimationEnd(player1Name, diceValues)
              }
            />
            <div className="player-info">
              <MenuDrop
                onDiceChange={handlePlayer1DiceChange}
                numberOfDices={[1, 2]}
              />
              <ScoreTable playerName={player1Name} diceRolls={player1Rolls} />
            </div>
          </div>
          <div className="player-container">
            <h2>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
            </h2>
            <Zaruri
              player="2"
              numberOfDice={numberOfDice}
              onRollDice={(diceValues) =>
                handleRollDice(player2Name, diceValues)
              }
              onAnimationEnd={(diceValues) =>
                handleAnimationEnd(player2Name, diceValues)
              }
            />
            <div className="player-info">
              <MenuDrop
                onDiceChange={handlePlayer2DiceChange}
                numberOfDices={[1, 2]}
              />
              <ScoreTable playerName={player2Name} diceRolls={player2Rolls} />
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        {showResetButton && (
          <button onClick={resetGame} className="button-reset">
            RESET
          </button>
        )}
        <button onClick={handleReturn} className="button-return">
          RETURN
        </button>
      </div>
    </div>
  );
};

export default GamePage;
