// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectLoadingTodos = (state) => state.todos.isLoading;

export const selectTodosError = (state) => state.todos.hasError;

export const selectUserTodos = (state) => {
  const { users, todos } = state;
  return todos.todos[users.selectedUserId];
};
