import { v4 as uuidv4 } from 'uuid';

export function todosReducer(currentTodos, action) {
    switch(action.type){
        case "added":{
            const newTodo =
            {
                id: uuidv4(),
                title: action.payload.title,
                details: "",
                flag: false
            };
            const newTodoVal = [...currentTodos, newTodo];
            localStorage.setItem("todos", JSON.stringify(newTodoVal))
            return newTodoVal;
        }case"deleted":{
            let newArr = currentTodos.filter((to) => {
                return to.id !== action.payload.id;
            })
            localStorage.setItem("todos",JSON.stringify(newArr));
            return newArr;
        }
        case"updated":{
            const updatedTodoArr=currentTodos.map((t)=>{
                if(t.id===action.payload.id){
                    return {...t,title:action.payload.title,details:action.payload.details};
                }
                else{
                    return t;
                }
            })
            localStorage.setItem("todos",JSON.stringify(updatedTodoArr));
            return updatedTodoArr;
        }
        case"check":{
            const newTodo = currentTodos.map((to) => {
                if (to.id === action.payload.id)
                return {...to,flag:!to.flag};
            return to;
            })
            console.log(currentTodos)
            localStorage.setItem("todos",JSON.stringify(newTodo));
            return newTodo;
        }
        case "get":{
            const getTodos=JSON.parse(localStorage.getItem("todos")) ?? [];
            return getTodos;
        }
        default:{
            throw Error("Unknown Action"+action.type)
        }
    }
}