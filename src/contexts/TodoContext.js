import { createContext, useReducer } from "react";
import { todosReducer } from "../reducers/todosReducer";

export  const TodoContext=createContext([]);

const TodosProvider=({children})=>{
    const [todoValue,dispatch]=useReducer(todosReducer,[])
    return(
        <TodoContext.Provider value={{todoValue,dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}
export default TodosProvider;