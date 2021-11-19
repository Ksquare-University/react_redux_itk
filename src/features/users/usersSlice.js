import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './usersThunks'

const initialState = {
  users: [],
  selectedUserId: '',
  isLoading: false,
  hasError: false,
};

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSelectedUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedUserId = action.payload;
    },
    addUser: (state, payload) => {
      state.users = [...state.users, ...payload.payload];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload];
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      }),
});

export const { setSelectedUser, addUser } = counterSlice.actions;

export default counterSlice.reducer;
