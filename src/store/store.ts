import { configureStore } from "@reduxjs/toolkit";

import api from "./api";
import todoReducer from "./todoreducer";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export default store;