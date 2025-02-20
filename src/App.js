import logo from './logo.svg';
import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme,ThemeProvider } from '@mui/material';
import { useContext } from 'react';
import { TodoContext } from './contexts/TodoContext'; 
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const fontTheme =createTheme({
    typography:{
      fontFamily:"Alex"
    }
  
})
let ToDos=[
  {
      id:uuidv4(),
      title:"قراءه", 
      details:"قراءه كتاب كن الشخص الذي يجعلك سعيدا",
      flag:false
  },
  {
      id:uuidv4(),
      title:"قراءه", 
      details:"قراءه كتاب كن الشخص الذي يجعلك سعيدا",
      flag:false

  },
  {
      id:uuidv4(),
      title:"قراءه", 
      details:"قراءه كتاب كن الشخص الذي يجعلك سعيدا",
      flag:false

  }
]
function App() {
  const [todoValue,setTodo]=useState(ToDos);
  return (
    <ThemeProvider theme={fontTheme}>
    <div className="App"
    style={{background:"#191b1f",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",direction:"rtl"}}>
      <TodoContext.Provider value={{todoValue,setTodo}}>
      <ToDoList/>
      </TodoContext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
