import React from 'react';
import './App.css';
import { Header } from './components/Header'
import { TodoList } from './components/todoList';



function App() {
  return (
    <div className="App">
      <Header />
      <TodoList todos={[
        {title: "Do dishes", isCompleted: true},
        {title: "Do homework", isCompleted: false}
        ]}/>
    </div>
  );
}

export default App;
