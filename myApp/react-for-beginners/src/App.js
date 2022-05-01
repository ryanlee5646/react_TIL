// 7.0 Todo List
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
    setTodos((currentArray) => [...currentArray, toDo]);
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
