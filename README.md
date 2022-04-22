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

## (3) useEffect

기본적으로 `State`가 변경되면 매번 컴포넌트가 Rerendering되는데 useEffect를 사용하면 매번 Rerendering 되지 않게 설정해 줄 수가 있다.
`useEffect(effect, deps)` 사용
effect에는 함수로직이 들어가고 deps는 배열형태로 배열안에 특정 변수가 들어가면 변수에 이벤트가 생길 때마다 변경해준다.
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