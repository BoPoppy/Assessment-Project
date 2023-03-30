import React, { useEffect } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch } from 'store/hooks';
import { FETCH_INVOICES_REQUEST } from 'store/reducers/invoices/actionTypes';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    dispatch({
      type: FETCH_INVOICES_REQUEST,
    });
  }, []);

  return (
    <Grid>
      <Button onClick={handleLogout}>Logout</Button>
    </Grid>
  );
};

export default Dashboard;
