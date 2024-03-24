//App.js

import "./App.css";
import MenuDrop from "./Componente/MenuDrop";
import Titlul from "./Componente/Titlul";
import Zaruri from "./Componente/Zaruri";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import GamePage from "./Componente/GamePage";

function App() {
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [init, setInit] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleRollDice = () => {};
  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleDiceChange = (newNumberOfDice) => {
    setNumberOfDice(newNumberOfDice);
  };

  const handleReturn = () => {
    setGameStarted(false);
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#eac4d5",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <div>
        <div className="background">
          <Particles
            id="tsparticles"
            options={options}
            particlesLoaded={particlesLoaded}
          />
          {gameStarted ? (
            <div>{<GamePage onReturn={handleReturn} />}</div>
          ) : (
            //Dacă jocul a început, se va afișa componenta <GamePage>, altfel se va afișa titlul jocului, zarurile și meniul de selecție a numărului de zaruri.
            //Dacă jocul a început (gameStarted este true), se afișează <GamePage onReturn={handleReturn} />.
            //Dacă jocul nu a început (gameStarted este false), se afișează <Titlul />, <Zaruri /> și <MenuDrop />.
            <div>
              <Titlul />
              <Zaruri numberOfDice={numberOfDice} onRollDice={handleRollDice} />
              <div className="menu-and-start">
                <MenuDrop
                  onDiceChange={handleDiceChange}
                  numberOfDices={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />
                <div className="game-start">
                  <button onClick={handleStartGame}>START GAME</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return <></>;
}

export default App;
