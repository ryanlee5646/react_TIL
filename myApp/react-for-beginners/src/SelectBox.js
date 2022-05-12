import React from "react";
import PropTypes from "prop-types"; // prop-types 호출

function SelectBox({ coins, rateKRW, onChange }) {
  return (
    <select onChange={onChange}>
      <option>코인을 선택하세요</option>
      {coins.map((coin) => (
        <option value={JSON.stringify(coin)} key={coin.id}>
          {coin.name}({coin.symbol}): ₩{Math.round(coin.price * rateKRW)}
        </option>
      ))}
    </select>
  );
}
SelectBox.propTypes = {
  coins: PropTypes.arrayOf.isRequired,
  onChange: PropTypes.func.isRequired,
  rateKRW: PropTypes.number.isRequired,
};

export default SelectBox;
