import {
  FormControlLabel,
  Button,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { postTodo } from '../features/todos/todosThunks';
import { selectLoadingTodos } from '../features/todos/todosSelectors';

export default function TodosForm({ onFinish }) {
  const [todoName, setTodoName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const isLoading = useSelector(selectLoadingTodos);
  const dispatch = useDispatch();

  const handleChangeName = (event) => {
    setTodoName(event.target.value);
  };

  const handleChangeComplete = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postTodo({ name: todoName, completed: isChecked })).then(() =>
      onFinish(false)
    );
  };

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      style={{ display: 'flex', flexDirection: 'column' }}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id='outlined-name'
        label='Name'
        placeholder='Name'
        value={todoName}
        onChange={handleChangeName}
      />
      <FormControlLabel
        control={
          <Checkbox checked={isChecked} onChange={handleChangeComplete} />
        }
        style={{ margin: '8px' }}
        label='Completed'
      />
      <Button type='submit' disabled={isLoading} variant='outlined'>
        {isLoading ? <CircularProgress size='1.5rem' /> : 'Submit'}
      </Button>
    </Box>
  );
}
