import React, { useState, useEffect } from "react";

function byeFn() {
  console.log("Bye");
}

function hiFn() {
  console.log("Hi");
  return byeFn;
}

function Hello() {
  useEffect(hiFn, []);
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}
export default App;

// ~6.3
// function App() {
//   const [counter, setValue] = useState(0);
//   const [keyword, setKeyword] = useState("");
//   const onChange = (event) => setKeyword(event.target.value);
//   const onClick = () => setValue((prev) => prev + 1);
//   console.log('여기는 항상 실행 됩니다.');
//   // 리렌더링 되더라도 해당 코드가 실행되지 않게하기
//   useEffect(() => {
//     console.log('여기는 한번만 실행됩니다.');
//   }, []);
//   useEffect(() => {
//     if (keyword !== "" && keyword.length > 5) {
//       console.log("여기는 키워드가 5글자가 넘고 변경될때만 실행됩니다");
//     }
//   }, [keyword]);

//   useEffect(() => {
//     console.log("여기는 카운트가 변경될때만 실행됩니다.");
//   }, [counter]);

//   useEffect(() => {
//     console.log("여기는 카운트나 키워드가 변경될때마다 실행됩니다.");
//   }, [counter, keyword]);

//   return (
//     <div className="App">
//       <input
//         value={keyword || ""} // input에 undefined경우 에러나는거 처리
//         onChange={onChange}
//         type="text"
//         placeholder="Search here..."
//       />
//       <h1>{counter}</h1>
//       <Button text="Continue" onClick={onClick} />
//     </div>
//   );
// }

// export default App;
