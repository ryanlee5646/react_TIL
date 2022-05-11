// 7.0-7.1 Coin Tracker(암호화폐들과 가격을 나열하는 프로젝트)
import React, { useState, useEffect } from "react";
// 참고: https://blog.toycrane.xyz/react%EC%97%90%EC%84%9C-select-box-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-a20e2bf082b2
function App() {
  const [loading, setLoading] = useState(true); // 로딩 메세지를 보여주기 위함
  const [coins, setCoins] = useState([]);
  const [rateKRW, setRateKRW] = useState(0);
  const [fromCoin, setFromCoin] = useState([]);
  const [toCoin, setToCoin] = useState([]);
  const [result, setResult] = useState(0);
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
  const fromCoinHandler = (event) => setFromCoin(event.target.value);
  const toCoinHandler = (event) => setToCoin(event.target.value);
  const doConvert = () => {
    console.log("coint", fromCoin.id);
    setFlag(true);
  };

  return (
    <div>
      <h1>The Coins {loading ? "" : `(TOP ${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : <p>From</p>}
      <select onChange={fromCoinHandler}>
        <option>코인을 선택하세요</option>
        {coins.map((coin) => (
          <option value={coin} key={coin.id}>
            {coin.name}({coin.symbol}): ₩
            {Math.round(coin.quotes.USD.price * rateKRW)}
          </option>
        ))}
      </select>
      <p>To</p>
      <select onChange={toCoinHandler}>
        <option>코인을 선택하세요</option>
        {coins.map((coin) => (
          <option value={coin.id} key={coin.id}>
            {coin.name}({coin.symbol}): ₩
            {Math.round(coin.quotes.USD.price * rateKRW)}
          </option>
        ))}
      </select>
      <br />
      <button onClick={doConvert}>Convert</button>
      <h2>
        Convert Coin:
        {flag ? `${result} ${toCoin.symbol}` : ""}
      </h2>
    </div>
  );
}
export default App;
