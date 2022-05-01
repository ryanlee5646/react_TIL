# REACT_TIL

## 1. 시작
### (1) 프로젝트 생성
```bash
$ npx create-react-app react-for-beginners
```
❗️ 명령어가 실행되지 않을 시 `nodeJS` 버전이 15버전 이상인지 확인

`npm` 명령어로 설치하는 방법도 있음
```
$ npm init react-app react-for-beginners 
```

## 2. 공부내용

### (1) PropTypes를 체크하는 방법
**prop-types 모듈 설치**
```bash
$ npm i prop-types
```
```js
// Button.js(버튼 컴포넌트)
import PropTypes from "prop-types"; // prop-types 호출

function Button({text}){
    
    return <button>{text}</button>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired, //버튼 type은 string형태로 선언, 조건에 맞지 않을시 에러발생
};

export default Button;

// App.js
import Button from "./Button.js"


function App() {
  return (
    <div className="App">
      <h1>Welcome back!</h1>  
      <Button text={"Continue"}/>
    </div>
  );
}

export default App;

```
### (2) CSS 모듈화
CSS를 모듈화시켜 사용이 가능하다.
가장 큰 장점은 Css에 class나 id명을 계속해서 기억할 필요가없다.
실행하게 되면 자동으로 HTML에 class명과 id가 생김 
```js
import React from 'react';
import PropTypes from 'prop-types'; // prop-types 호출
import styles from './Button.module.css'; // CSS를 모듈화 할때 [파일명].module.css으로 호출

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>; // css에 선택자 .class => className, id => id
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
```

### (3) useEffect

기본적으로 `State`가 변경되면 매번 컴포넌트가 Rerendering되는데 useEffect를 사용하면 매번 Rerendering 되지 않게 설정해 줄 수가 있다.
`useEffect(effect, deps)` 사용
Effect에는 함수로직이 들어가고 deps는 배열형태로 배열안에 특정 변수가 들어가면 변수에 이벤트가 생길 때마다 변경해준다.

그리고 보통 useEffcet를 사용할 때 Effect 함수를 따로 만들지 않고 바로 그 자리에 함수를 만들어서 사용함
`function(){}` 형태의 함수보다 `() = > {}` 형태의 함수를 더 선호
```js
function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState('');
  const onChange = (event) => setKeyword(event.target.value);
  const onClick = () => setValue((prev) => prev + 1);
  console.log('여기는 항상 실행 됩니다.');
  // 리렌더링 되더라도 해당 코드가 실행되지 않게하기
  useEffect(() => {
    console.log('여기는 한번만 실행됩니다.');
  }, []);

  useEffect(() => {
    if (keyword !== '' && keyword.length > 5) {
      console.log('여기는 키워드가 5글자가 넘고 변경될때만 실행됩니다');
    }
  }, [keyword]);

  useEffect(() => {
    console.log('여기는 카운트가 변경될때만 실행됩니다.');
  }, [counter]);

  useEffect(() => {
    console.log('여기는 카운트나 키워드가 변경될때마다 실행됩니다.');
  }, [counter, keyword]);

  return (
    <div className="App">
      <input
        value={keyword || ''} // input에 undefined경우 에러나는거 처리
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <Button text="Continue" onClick={onClick} />
    </div>
  );
}

export default App;
```

### (4) JSX 조건문

JSX 조건문으로 State 상태 값이 바뀔 때마다 컴포넌트를 동적으로 변환한다
```js
import React, { useState, useEffect } from 'react';

function Hello() {
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null} <!-- JSX 조건문 -->
      <button onClick={onClick}>{showing ? 'Hide' : 'Show'}</button>
    </div>
  );
}
export default App;
```

### (5) clearnUp Function

useEffect의 첫번째 인자인 Effect함수에서 return 값에 clearnUp 함수를 리턴하게 되면  컴포넌트가 사라질 때 해당 함수가 실행된다.
```js
import React, { useState, useEffect } from 'react';

function byeFn() {
  console.log('Bye');
}

function hiFn() {
  console.log('Hi');
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
      {showing ? <Hello /> : null} <!-- JSX 조건문 -->
      <button onClick={onClick}>{showing ? 'Hide' : 'Show'}</button>
    </div>
  );
}
export default App;
```

### (6) useState 배열 수정

State가 배열이면 배열에 값을 추가할 때 직접적으로 `toDos.push`와 같이 추가하지 않는다.
`setTodos()`함수안에 `currentArray`(변수이름은 상관없음)을 선언하여 함수를 만들어주고 
`[...currentArray, toDo]`형태로 선언하게 되면 `toDo` State가 배열 맨뒤에 추가되게 할 수 있다.
`...`을 붙이게 되면 배열 안에 요소 하나하나를 풀어서 더하게 된다.
```js
import React, { useState, useEffect } from "react";

function App() {
  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setTodo("");
    setTodos((currentArray) => [...currentArray, toDo]); // toDo를 뒤에 붙이면 현재 배열 뒷부분에 추가
  };
  console.log(toDos);
  return (
    <div>
      <h1>
        My Todo List (
        {toDos.length}
        )
      </h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do!!"
        />
        <button>Add toDo</button>
      </form>
    </div>
  );
}
export default App;

```