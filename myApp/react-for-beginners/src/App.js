// 7.0-7.1 Coin Tracker(암호화폐들과 가격을 나열하는 프로젝트)
import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true); // 로딩 메세지를 보여주기 위함
  useEffect(() => {

  }, []);
  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? <strong>Loading...</strong> : null}
    </div>
  );
}
export default App;
