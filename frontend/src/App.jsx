import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route
import LoginPage from './components/Login';
import RegisterPage from './components/RegisterPage';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';  // Import Todo component

const App = () => {
  return (
    <>
      {/* <h1 className="text-3xl text-center font-bold underline">Learn About Redux-Toolkit</h1> */}
      
      {/* Set up Routes here */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<RegisterPage/>} />  
        <Route path="/todo" element={<><AddTodo/><Todos/></>} />  
      </Routes>
      {/* <AddTodo/>
      <Todo/> */}
    </>
  );
};

export default App;
