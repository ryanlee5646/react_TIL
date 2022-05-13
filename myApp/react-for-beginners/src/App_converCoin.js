// 7.2 Coin Tracker(암호화폐들과 가격을 나열하는 프로젝트)
import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";

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
        const tmpCoin = json.slice(0, 100);
        const parseCoinInfo = [];
        for (let i = 0; i < tmpCoin.length; i++) {
          parseCoinInfo.push({
            id: i,
            name: tmpCoin[i].name,
            symbol: tmpCoin[i].symbol,
            price: tmpCoin[i].quotes.USD.price,
          });
        }
        setCoins(parseCoinInfo);
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

  const fromCoinHandler = (e) => {
    setFromCoin(JSON.parse(e.target.value));
    setFlag(false);
  };
  const toCoinHandler = (e) => {
    setToCoin(JSON.parse(e.target.value));
    setFlag(false);
  };
  const doConvert = () => {
    console.log(fromCoin.name);
    setResult(fromCoin.price / toCoin.price);
    setFlag(true);
  };

  return (
    <div>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h1>The Coins {loading ? "" : `(TOP ${coins.length})`}</h1>
          {loading ? <strong>Loading...</strong> : <p>From</p>}
          <SelectBox
            coins={coins}
            rateKRW={rateKRW}
            onChange={fromCoinHandler}
          />
          <p>To</p>
          <SelectBox coins={coins} rateKRW={rateKRW} onChange={toCoinHandler} />
          <br />
          <button onClick={doConvert}>Convert</button>
          <h2>
            Convert Coin: <span />
            {flag ? `${result.toFixed(3)} ${toCoin.symbol}` : ""}
          </h2>
        </div>
      )}
    </div>
  );
}
export default App;
