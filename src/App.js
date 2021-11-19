import React from 'react';
import UsersList from './components/UsersList';
import UserInformation from './components/UserInformation';
import './App.css';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className='App'>
      <Typography style={{
          marginTop: '3rem',
        }} variant="h4" color="purple">Redux Example</Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '3rem',
        }}
      >
        <UsersList />
        <UserInformation />
      </div>
    </div>
  );
}

export default App;
