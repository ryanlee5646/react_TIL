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
