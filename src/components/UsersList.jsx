import {
  List,
  ListItem,
  Divider,
  Button,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import { getUsers } from '../features/users/usersThunks';
import { setSelectedUser } from '../features/users/usersSlice';
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from '../features/users/usersSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';

export default function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSelectUser = (id) => () => {
    dispatch(setSelectedUser(id));
  };

  const refetchUsers = () => {
    dispatch(getUsers());
  };

  if (error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        There was an error fetching the information!
        <div>
          <Button variant='outlined' onClick={refetchUsers}>
            Click to refetch
          </Button>
        </div>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography component='h5'> USERS </Typography>
      <List>
        {users.map((user) => (
          <Fragment key={user.id}>
            <ListItem>
              <Button onClick={handleSelectUser(user.id)}>{user.name}</Button>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );
}
