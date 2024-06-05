import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    text: string;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    init: boolean;
}

const initialState: TodoState = {
    todos: [],
    loading: true,
    init: false
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    initTodos: (state, action: PayloadAction<{ todos: Todo[]; loading: boolean; init: boolean }>) => {
        state.todos = action.payload.todos;
        state.loading = action.payload.loading;
        state.init = true;
    },
    addToTodoAction: (state, action: PayloadAction<{ id: string; text: string }>) => {
        const { id, text } = action.payload;
        state.todos = [...state.todos, { id, text }];
    },
    deleteTodoAction: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;
        state.todos = state.todos.filter(todo => todo.id !== id);
    },
    editTodoAction: (state, action: PayloadAction<{ id: string; text: string }>) => {
        const { id, text } = action.payload;
        state.todos = state.todos.map(todo => {
            if (todo.id === id) {
                return {
                    id,
                    text
                };
            }
            return todo;
        });
        console.log(state.todos);
    },
  }
});

export const { initTodos, addToTodoAction, deleteTodoAction, editTodoAction } = todoSlice.actions;
export default todoSlice.reducer;

