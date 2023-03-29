import React from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

type Props = {};

const Dashboard = (props: Props) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Grid>
      <Button onClick={handleLogout}>Logout</Button>
    </Grid>
  );
};

export default Dashboard;
