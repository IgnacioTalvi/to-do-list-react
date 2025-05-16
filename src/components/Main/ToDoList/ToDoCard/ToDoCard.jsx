import React from "react";

const ToDoCard = ({data, remove}) => {

  const {day, task, category} = data;


  return <article >
    <div className="todo-card">
      <input type="checkbox"/>
      <p>Day: {day}, Task: {task}, Category: {category}</p>
      <button onClick={remove}>Borrar</button>
    </div>  
    </article>;
  };

export default ToDoCard;

