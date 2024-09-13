import {createSlice,nanoid} from '@reduxjs/toolkit';

const initialState = {
    todos:[{id:1,text:"Hello World"}]
};

function sayHello(){
    console.log("Hello from the todoslice");
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {//  Reducers consists of properties and functions 
        // addTodo: sayHello

        // state gives the current state 
        addTodo: (state,action)=>{
            const todo ={
                id:nanoid(),
                text: action.payload
            }
            state.todos.push(todo);
        },
        removeTodo: (state,action)=>{
            state.todos=state.todos.filter((todo)=> todo.id !== action.payload)
        },
        // editTodo: (state, action) => {
        //     state.todos = state.todos.map((todo) => 
        //         todo.id === action.payload.id 
        //         ? { ...todo, text: action.payload.text } // Update the todo's text
        //         : todo // Return the original todo if it doesn't match
        //     );
        // }

        
    }
})

export const {addTodo, removeTodo,editTodo} = todoSlice.actions;
export default todoSlice.reducer