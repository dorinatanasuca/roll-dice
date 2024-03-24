//MenuDrop.js

import "./MenuDrop.css";

const MenuDrop = ({ onDiceChange, numberOfDices }) => {
  const handleDiceChange = (e) => {
    onDiceChange(e.target.value);
  };

  return (
    <div>
      <label className="MenuDrop-style">
        HOW MANY DICE DO YOU NEED?
        <select name={numberOfDices} onChange={handleDiceChange}>
          {numberOfDices.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default MenuDrop;
