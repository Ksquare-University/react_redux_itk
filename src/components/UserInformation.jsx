import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import TodoForm from './TodoForm';
import { getUserTodosById } from '../features/todos/todosThunks';
import { selectSpecificUser } from '../features/users/usersSelectors';
import {
  selectUserTodos,
  selectTodosError,
} from '../features/todos/todosSelectors';
import { clearError } from '../features/todos/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useState } from 'react';

export default function UsersList() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectSpecificUser);
  const userTodos = useSelector(selectUserTodos);
  const todosError = useSelector(selectTodosError);

  const handleGetUserBooks = (id) => () => {
    dispatch(getUserTodosById(id));
  };

  const handleAddATodo = (value) => setShowForm(value);

  const handleClearError = () => dispatch(clearError());

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {selectedUser ? (
            <Fragment>
              <Typography sx={{ fontSize: 22 }}>{selectedUser.name}</Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                {selectedUser.email}
              </Typography>
              <CardActions
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                {userTodos ? (
                  <Fragment>
                    {!showForm && (
                      <Button
                        onClick={() => handleAddATodo(true)}
                        variant='outlined'
                      >
                        Add a TODO
                      </Button>
                    )}
                  </Fragment>
                ) : (
                  <Button
                    variant='outlined'
                    onClick={handleGetUserBooks(selectedUser.id)}
                  >
                    Get TODOS
                  </Button>
                )}
              </CardActions>
              {showForm ? (
                <TodoForm onFinish={handleAddATodo} />
              ) : (
                <div style={{ maxHeight: '30rem', overflow: 'auto' }}>
                  {userTodos?.map((todo) => (
                    <Card style={{ maxWidth: '15rem', marginBottom: '1rem' }}>
                      <CardContent>
                        <Typography
                          style={
                            todo.completed
                              ? { textDecoration: 'line-through' }
                              : {}
                          }
                        >
                          {todo.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </Fragment>
          ) : (
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              Please select a user
            </Typography>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={todosError}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClearError}
      >
        <Alert
          onClose={handleClearError}
          severity='error'
          sx={{ width: '100%' }}
        >
          There was an error!
        </Alert>
      </Snackbar>
    </div>
  );
}
