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
    setTodos((currentArray) => [...currentArray, toDo]); // toDo를 뒤에 붙이면 현재 배열 뒷부분에 추가
    setTodo("");
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

### (7) map함수 사용

`map` 함수는 배열에 있는 item을 내가 원하는 무엇이든지 바꿔주고 새로운 array로 return 해준다
`map` 함수는 각 item을 인자값으로 받아 올 수가 있다.
```js
['a', 'b', 'c', 'd', 'e'].map((item) => item.toUpperCae());
-> ['A', 'B', 'C', 'D', 'E'];

```

### (8) 배열의 요소를 렌더링 하는 경우 key를 설정해야함

`map`함수의 두번째 값은 배열의 인덱스를 나타낸다. 배열의 요소는 각각 고유한 `key`를 가지고 있어야 한다. 그렇지 않으면 에러남. 하지만 배열의 `index`를 `key`로 가지는 건 좋지 못한 방법이다. 
배열의 요소가 삭제되거나 추가가 될때 인덱스 또한 바뀌기 때문이다.
보통 배열의 요소가 id를 가지고 있는 객체 형태이거나, 
전역에 id를 count해주는 변수를 선언해줘서 추가하는 방법 등 다른 방식으로 해결하는 것이 좋다.
```js
<ul>
  {toDos.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
```

### (9) event.target.value 형태가 [object, Object] 일때 문제해결
`JSON.stringify()`: JavaScript 객체를 JSON 문자열로 변환할 때는 JSON 객체의 `stringify()` 메서드를 사용. 문자열로 된 자바스크립트 객체는 `[]`이나 `.`으로 접근이 불가능하다.
`JOSN.parse()`:  JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성한다.


```js
// coin
{
  id: i,
  name: tmpCoin[i].name,
  symbol: tmpCoin[i].symbol,
  price: tmpCoin[i].quotes.USD.price,
}

// Selectbox 컴포넌트
function SelectBox({ coins, rateKRW, onChange }) {
  return (
    <select onChange={onChange}>
      <option>코인을 선택하세요</option>
      {coins.map((coin) => (
        <option value={JSON.stringify(coin)} key={coin.id}> // 
          {coin.name}({coin.symbol}): ₩{Math.round(coin.price * rateKRW)}
        </option>
      ))}
    </select>
  );
}

// Selebox의 onChange 이벤트가 발생할 때 실행되는 함수
const fromCoinHandler = (e) => {
    setFromCoin(JSON.parse(e.target.value)); //Json 형식의 문자열로 반환된 데이터를 자바스크립트 객체로 변환           
    setFlag(false);
  };
```

### (10) API 가져오기
`fetch()`: javascript의 fetch("URL") 메서드를 이용해서 api를 가져 올 수 있다.
기본적으로 호출방식(GET, POST, PUT...) 방식을 선언하지 않고 호출을 하면 GET방식으로 호출한다.

```js
// # 방법1. fetch로 api호출 후 .then()으로 파싱
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
}, []); // useEffect를 한번만 사용하고 싶을 경우 deps는 []

// # 방법2. async / await 방식 (이 방법을 요즘 더 선호)
const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.7&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
```
### (11) PropTypes
React에서 `Props`값을 넘겨받을 때 해당 Props의 타입을 선언해줘야 한다.
그리고 `PropTypes`가 객체, 배열의 형태라면 해당 속성의 타입까지 선언해 줘야한다. 

```js
import React from "react";
import PropTypes from "prop-types";

function Movie({ coverImage, title, summary, genres }) {
  return (
    <div>
      <img src={coverImage} alt="" />
      <h2>{title}</h2>
      <p>{summary}</p>
    </div>
  );
}

Movie.propTypes = {
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired // PropType이 배열인 경우 안에 속성까지 선언
};

export default Movie;
```

### (12) React Router
사용자가 입력한 주소를 감지하는 역할을 하며, 여러 환경에서 동작 할 수 있도록 다양한 라우터 컴포넌트를 제공한다. 쉽게 말해서 사용자가 요청한 URL에 따라 페이지를 보여주는 것이라고 생각할 수 있다.
그래서 하나의 페이지를 라우터라고 명칭한다. (ex) Movie 라우터

React Router 설치 :  `npm install react-router-dom`

* `Switch` : Route(페이지 URL)를 찾고 컴포넌트를 렌더링하는 역할
* `Route` : 페이지 URL
* `Link` : <a>태그를 이용해서 페이지를 이동하게 되면 페이지 전체가 호출 되지만 `Link` 컴포넌트를 이용하게 되면 새로고침을 하지 않고 다른 페이지로 이동시켜준다.

```js
// App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

// Movie.js
import { Link } from "react-router-dom";

function Movie({ coverImage, title, summary, genres }) {
  return (
    <div>
      <img src={coverImage} alt="" />
      <h2>
        <Link to="/movie">{title}</Link>
      </h2>
      <p>{summary}</p>
    </div>
  );
}
```
### (13) React Router 동적 라우팅
1. `:id`: 리액트에서 동적라우팅을 이용하는 방법은 라우팅 `path`에서 동적인 부분에 `:`을 붙여준다.
2. 동적인 경로를 지정해주기 위해 `id` 값의 props를 받아와서 `Link` 경로에 `${id}`형태로 선언해준다.
3. 동적라우팅으로 이동한 페이지에서 `useParams`를 통해 URL Parameter를 알수가 있다.
   (ex) Route경로에서 `:id` 형태로 지정된 Prameter  
```js
// App.js
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

// Movie.js
function Movie({ id, coverImage, title, summary, genres }) {
  return (
    <div>
      <img src={coverImage} alt="" />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
    </div>
  );
}

// Detail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const getDetail = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
    ).json();
  };
  useEffect(() => {
    getDetail();
  }, []);

  return <h1>Detail</h1>;
}
```