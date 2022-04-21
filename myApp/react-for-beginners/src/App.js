import React, { useState, useEffect } from 'react';
import Button from './Button';

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log('계속 실행!!');
  // 리렌더링 되더라도 해당 코드가 실행되지 않게하기
  useEffect(() => {
    console.log('CALL THE API');
  }, []);
  return (
    <div className="App">
      <h1>{counter}</h1>

      <Button text="Continue" onClick={onClick} />
    </div>
  );
}

export default App;
