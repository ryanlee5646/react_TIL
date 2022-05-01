// 7.0-7.1 Todo List
import React, { useState, useEffect } from "react";

function App() {
  const [toDo, setTodo] = useState(""); // toDo 입력
  const [toDos, setTodos] = useState([]); // toDo 리스트
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setTodo("");
    setTodos((currentArray) => [...currentArray, toDo]);
  };
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
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
