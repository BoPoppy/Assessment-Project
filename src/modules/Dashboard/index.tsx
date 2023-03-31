import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { FETCH_INVOICES_REQUEST } from 'store/reducers/invoices/actionTypes';
import LoadingFullPage from 'components/common/LoadingFullPage';
import FilterMenu from './FilterMenu';
import { FETCH_INVOICE_PARAMS_TYPE } from 'models/invoice';
import InvoiceTable from './InvoiceTable';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { is_global_loading } = useAppSelector((state) => state.global);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [dataFilter, setDataFilter] = useState<FETCH_INVOICE_PARAMS_TYPE>({
    pageNum: 1,
    fromDate: '',
    ordering: 'ASCENDING',
    pageSize: 20,
    sortBy: '',
    status: '',
    toDate: '',
  });

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    dispatch({
      type: FETCH_INVOICES_REQUEST,
      payload: {
        params: dataFilter,
      },
    });
  }, [dataFilter, dispatch]);

  return (
    <Grid
      container
      direction="column"
      sx={{
        minHeight: '100%',
      }}
    >
      <LoadingFullPage isLoading={is_global_loading} />
      <AppBar position="static" component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SimpleInvoice
          </Typography>
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Grid
        container
        sx={{
          p: { xs: 2, md: 4 },
        }}
      >
        <Grid item xs={0} md={4} container>
          <FilterMenu />
        </Grid>
        <Grid item xs={12} md={8} container>
          <InvoiceTable dataFilter={dataFilter} setDataFilter={setDataFilter} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
