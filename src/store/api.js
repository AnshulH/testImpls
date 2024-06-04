import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
      getTodos: builder.query({
        query: () => "todos",
      }),

      addTodos: builder.mutation({
        query: (body) => ({
          url: "/todos",
          method: "POST",
          body,
        }),
      }),

      deleteTodos: builder.mutation({
        query: (todo) => ({
          url: `/todos/${todo.id}`,
          method: "DELETE",
        }),
      }),

      editTodos: builder.mutation({
        query: (body) => ({
          url: `/todos/${body.id}`,
          method: "PUT",
          body
        }),
        
      }),
    })
  });
  
  export const { useGetTodosQuery, useAddTodosMutation, useDeleteTodosMutation, useEditTodosMutation } = api;
  
  export default api;