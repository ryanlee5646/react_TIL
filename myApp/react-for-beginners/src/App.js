// 7.0-7.1 Coin Tracker(암호화폐들과 가격을 나열하는 프로젝트)
import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true); // 로딩 메세지를 보여주기 위함
  const [coins, setCoins] = useState([]);
  const [rateKRW, setRateKRW] = useState(0);
  const [fromCoin, setFromCoin] = useState([]);
  const [toCoin, setToCoin] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    // 코인정보
    fetch("https://api.coinpaprika.com/v1/tickers?qutoes=KRW") // fetch는 javascript API호출 메서드
      .then((response) => response.json())
      .then((json) => {
        setCoins(json.slice(0, 100)); // 코인 종류가 너무 많아서 Top100만
        setLoading(false);
      });
    // 환율
    fetch(
      "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
    )
      .then((response) => response.json())
      .then((json) => {
        setRateKRW(json[0].basePrice);
      });
  }, []); // useEffect를 한번만 사용하고 싶을 경우 deps는 []
  const doConvert = () => {};

  return (
    <div>
      <h1>The Coins {loading ? "" : `(TOP ${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : <p>From</p>}
      <select>
        {coins.map((coin) => (
          <option value={coin.quotes.USD.price} key={coin.rank}>
            {coin.name}({coin.symbol}): ₩
            {Math.round(coin.quotes.USD.price * rateKRW)}
          </option>
        ))}
      </select>
      <p>To</p>
      <select>
        {coins.map((coin) => (
          <option value={coin.quotes.USD.price} key={coin.rank}>
            {coin.name}({coin.symbol}): ₩
            {Math.round(coin.quotes.USD.price * rateKRW)}
          </option>
        ))}
      </select>
      <br />
      <button onClick={doConvert}>Convert</button>
      <h2>
        Convert Coin:
        {flag ? `${Math.round(fromCoin / toCoin, 2)} ${toCoin.symbol}` : ""}
      </h2>
    </div>
  );
}
export default App;
