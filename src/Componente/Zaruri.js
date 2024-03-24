// Zaruri.jsx

import React, { useEffect, useState } from "react";
import "./Zaruri.css";

const Zaruri = ({ player, numberOfDice, onRollDice }) => {
  const [rolling, setRolling] = useState(false);
  const [diceValues, setDiceValues] = useState(
    Array.from({ length: numberOfDice }, () => 1)
  );

  useEffect(() => {
    if (rolling) {
      let numberOfRolls = 1;
      const interval = setInterval(() => {
        const randomDiceValues = Array.from(
          { length: numberOfDice },
          () => Math.floor(Math.random() * 6) + 1
        );
        setDiceValues(randomDiceValues);
        numberOfRolls++;

        if (numberOfRolls === 9) {
          setRolling(false);
          onRollDice(randomDiceValues);
          console.log(randomDiceValues);
          clearInterval(interval);
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [rolling, numberOfDice]);

  useEffect(() => {
    if (numberOfDice < diceValues.length) {
      setDiceValues(diceValues.slice(0, numberOfDice));
    } else {
      setDiceValues([
        ...diceValues,
        ...Array.from({ length: numberOfDice - diceValues.length }, () => 1),
      ]);
    }
  }, [numberOfDice]);

  const rollDice = () => {
    console.log("is rolling");
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 900);
  };

  return (
    <>
      <div className={`zaruri-roller-container player-${player}`}>
        <div className="zaruri-roller">
          {diceValues.map((value, index) => (
            <div
              key={index}
              className={`die die-${index + 1} ${rolling ? "rolling" : ""}`}>
              <div
                className="die-face"
                style={{
                  backgroundImage: `url(images/dice${value}.jpg)`,
                  boxShadow: rolling ? "0 0 10px 5px white" : "",
                }}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="roll-button-container">
        <button onClick={rollDice} disabled={rolling} className="roll-button">
          {rolling ? "Rolling..." : "Roll Dice !"}
        </button>
      </div>
    </>
  );
};

export default Zaruri;
