import { createSlice } from '@reduxjs/toolkit';
import { getUserTodosById, postTodo } from './todosThunks';

const initialState = {
  todos: {},
  isLoading: false,
  hasError: false,
};

export const counterSlice = createSlice({
  name: 'todos',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearError: (state) => {
      state.hasError = false;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {
    [getUserTodosById.pending]: (state) => {
      state.hasError = false;
      state.isLoading = true;
    },
    [getUserTodosById.fulfilled]: (state, action) => {
      const { userId, userTodos } = action.payload;

      state.todos = { ...state.todos, [userId]: userTodos };
      state.isLoading = false;
    },
    [getUserTodosById.rejected]: (state, action) => {
      state.hasError = true;
      state.isLoading = false;
    },
    [postTodo.pending]: (state) => {
      state.hasError = false;
      state.isLoading = true;
    },
    [postTodo.fulfilled]: (state, action) => {
      const { userId } = action.payload;
      // Copy our current todos for this person
      const personTodos = [...state.todos[userId]];
      // And add the new created
      personTodos.push(action.payload);

      state.todos = { ...state.todos, [userId]: personTodos };
      state.isLoading = false;
    },
    [postTodo.rejected]: (state) => {
      state.hasError = true;
      state.isLoading = false;
    },
  },
});

export const { clearError } = counterSlice.actions;

export default counterSlice.reducer;