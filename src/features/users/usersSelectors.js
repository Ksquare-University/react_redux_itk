// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.hasError;

export const selectUsers = (state) => state.users.users;

export const selectSpecificUser = (state) => {
  const { users } = state;
  const foundUser = state.users.users.find((user) => user.id === users.selectedUserId)
  return foundUser;
};