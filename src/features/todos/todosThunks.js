import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserTodosById = createAsyncThunk(
  'todos/getUserTodosById',
  async (id) => {
    try {
      const todos = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}/todos`
      ).then((response) => response.json());
      return { userId: id, userTodos: todos };
    } catch (error) {
      return error;
    }
  }
);

export const postTodo = createAsyncThunk(
  'todos/postTodo',
  async (body, thunkAPI) => {
    // try {
      const { users, todos } = thunkAPI.getState();

      // Create a new todo to add to the state
      const newTodo = {
        userId: users.selectedUserId,
        id: todos.todos[users.selectedUserId].length + 1,
        title: body.name,
        completed: body.completed,
      };

      return await new Promise((resolve, reject) =>
        setTimeout(() => {
          // For example purpouse, simulating a possible error
          const errorProbability = Math.random();
          if (errorProbability > 0.9) {
            return reject('Something went wrong!');
          }
          return resolve(newTodo);
        }, 1000)
      );

    // } catch (error) {
         // You can also use the thunkAPI from createAsyncThunk 
         // to wrap your reject response if promise rejection is not sufficient
         // catch your error with trycatch and return thunkAPI.rejectWithValue(something)
    //   // return thunkAPI.rejectWithValue(error);
    // }
  }
);
