import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    loading: true,
    init: false
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    initTodos: (state, action) => {
        state.todos = action.payload.todos;
        state.loading = action.payload.loading;
        state.init = true;
    },
    addToTodoAction: (state, action) => {
        const {payload} = action;
        state.todos = [...state.todos, {id: payload.id, text: payload.text}];
    },
    deleteTodoAction: (state, action) => {
        const id = action.payload.id;
        let newTodos = state.todos.filter(todo => todo.id !== id);
        state.todos = newTodos;
    },
    editTodoAction: (state, action) => {
        const id = action.payload.id;
        let newTodos = state.todos.map(todo => {
            if (todo.id === id) {
                return {
                    id: id,
                    text: action.payload.text
                };
            }
            return todo;
        });
        console.log(newTodos);
        state.todos = newTodos;
    },
  }
});

export const {initTodos, addToTodoAction, deleteTodoAction, editTodoAction} = todoSlice.actions
export default todoSlice.reducer;