import React, { useState, useRef, useEffect } from "react";
import ToDoCard from "./ToDoCard/ToDoCard";
import "./ToDoList.css";
import data from "./data.js"

const ToDoList = () => {

  // // Estado inicial del array
  const [items, setItems] = useState(data);
  const [values, setValues] = useState ({day: "", task: "", category: ""})
  const [taskAdded, setTaskAdded] = useState(false);

  const inputRef = useRef(""); // esta referencia será un string vacío al principio

  const paintData = () =>
    items.map((item, index) => (
      <ToDoCard key={index} data={item} remove={() => removeItem(index)} />
    ));

  const removeAllItems = () => setItems([]);
  const resetItems = () => setItems(data);

  const removeItem = (i) => {
    const remainingItems = items.filter((item, index) => index !== i);
    setItems(remainingItems);
  };

  const addItem = (new_item) => {
    setItems([...items,new_item]);
  }

  useEffect(() => {
    if (taskAdded) {
      console.log("Hola");
      

      const timer = setTimeout(() => {
        setTaskAdded(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }
  }, [taskAdded]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    addItem(values);
    setValues({day: "", task: "", category:""});
    setTaskAdded (true);
  };


  return <>
  <div className="todo-container"> 
    
    <h1>To do list</h1>
    <form onSubmit={handleSubmit}>

    <div className="inputs-container"> 
      <label htmlFor="day">Día</label><br />
      <input type="text" name="day" value={values.day} onChange={handleChange} /><br />

      <label htmlFor="task">Tarea</label><br />
      <input type="text" name="task" value={values.task} onChange={handleChange} minLength='6' /><br />

      <label htmlFor="category">Categoria</label><br />
      <input type="text" name="category" value={values.category} onChange={handleChange}/><br />

    </div> 

    {taskAdded && <p>Tarea añadida</p>}

    {values.day && values.task && values.category ?
        <button type="submit">Crear tarea</button>:
        <b>Rellena los campos para crear una tarea</b>
        }
        
        </form>

   {paintData()}

  <div className="todo-buttons">
      <button onClick={removeAllItems}>Clear all</button>
      <button onClick={resetItems}>Reset</button>
      {/* <button onClick={() => removeItem(1)}>Borrar un elemento</button> */}
  </div>
  </div>
</>;
};

export default ToDoList;
