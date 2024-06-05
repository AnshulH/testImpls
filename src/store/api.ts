import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
      getTodos: builder.query<any, void>({
        query: () => "todos",
      }),

      addTodos: builder.mutation<any, any>({
        query: (body) => ({
          url: "/todos",
          method: "POST",
          body,
        }),
      }),

      deleteTodos: builder.mutation<any, { id: string }>({
        query: (todo) => ({
          url: `/todos/${todo.id}`,
          method: "DELETE",
        }),
      }),

      editTodos: builder.mutation<any, { id: string; text: string }>({
        query: (body) => ({
          url: `/todos/${body.id}`,
          method: "PUT",
          body: body
        }),
        
      }),
    })
  });
  
  export const { useGetTodosQuery, useAddTodosMutation, useDeleteTodosMutation, useEditTodosMutation } = api;
  
  export default api;

