import React from "react";
import { useState, useEffect } from "react";
import { collection ,getDocs, addDoc , updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "./modules/firebase-config";



function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todo,setTodo] = useState([]);
  const todoCollectioRef = collection(db,"turbo-data");
  const addTodo = async (e) => {
    e.preventDefault();  
   
    try {
        const docRef = await addDoc(todoCollectioRef, {
          allDone: false,
          todo: newTodo,    
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

 const UpdataTodo = async (id, newtodo)=>{
  const docRef = doc(db, "turbo-data",id);
  const newField = {todo: newtodo}
  await updateDoc(docRef,newField);

  }

  const deleteTodo = async (id)=>{
    const docRef = doc(db, "turbo-data",id);
    await deleteDoc(docRef);
  }

  useEffect(()=>{


    const getTodos = async ()=> {
      const data = await getDocs(todoCollectioRef);
    setTodo(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
    };
    getTodos()
  },[]);

  return (
    <div className="App">
      <div className="flex h-screen  bg-white shadow-md rounded-md  justify-center items-center">
        <div className="dark:bg-gray-700 rounded-md w-max mx-9">
        <header className="dark:bg-gray-700 text-white flex flex-col gap-4 bg-white shadow-md p-4 rounded-md">
        <h1 className="mb-4 border-b border-2-gray font-bold text-xl">Todo List (Turbo App)</h1>
        <form className=" flex flex-row gap-2 justify-between items-center">
        <div className="mb-6">
  <label htmlFor="success" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Add Your Task</label>
  <input type="text" onChange={(event)=>{
    setNewTodo(event.target.value);
  }} id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Add your Task Here ..." />

</div>
          <button className="transition duration-150 ease-in-out dark:bg-green-700 p-2 rounded-md " onClick={addTodo} >Add Task</button>
        </form>
      </header>
      <div className="relative justify-center items-center w-full rounded-md p-4 gap-2 dark:bg-slate-500 text-center">
        <h2 className="text-2xl border-b p-2 border-2-b font-bold text-white">Task List</h2>
        <div className="w-max  justify-center items-center rounded-md p-4 gap-2 dark:bg-slate-500">
         {
          todo.map((tasklist)=>{
            return (
              <span  key= {tasklist.id}  className="flex flex-row justify-center items-center gap-2 border-b p-2 border-2-b">
          <input type="checkbox" name="" id="" className="font-lg "/>
          <input type="text" className="w-80 bg-green-50 borde text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block  p-2.5 dark:bg-gray-700 dark:border-green-500 " value={tasklist.todo} />
          <div className="flex space-x-2 justify-center">
        <div className="flex flex-row h-max w-max gap-2">
        <button type="button" className="p-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={UpdataTodo(tasklist.id, tasklist.todo)}>Edit</button>
        
        <button type="button" className=" p-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={()=>{deleteTodo(tasklist.id)}}>Remove</button>
        
        </div>
        </div> 
          </span>
            );
         })}
          

        </div>
      </div>
        </div>
      
      </div>
    </div>
  )
}

export  default App;