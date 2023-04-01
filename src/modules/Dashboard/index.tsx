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
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { FETCH_INVOICES_REQUEST } from 'store/reducers/invoices/actionTypes';
import LoadingFullPage from 'components/common/LoadingFullPage';
import FilterMenu from './FilterMenu';
import { FETCH_INVOICE_PARAMS_TYPE } from 'models/invoice';
import InvoiceTable from './InvoiceTable';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import FilterDialog from './FilterDialog';
import CreateInvoiceDialog from './CreateInvoiceDialog';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { is_global_loading } = useAppSelector((state) => state.global);
  const { invoices_list } = useAppSelector((state) => state.invoices);
  const theme = useTheme();
  const isBreakpointDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [dataFilter, setDataFilter] = useState<FETCH_INVOICE_PARAMS_TYPE>({
    pageNum: 1,
    fromDate: '',
    ordering: 'ASCENDING',
    pageSize: 10,
    sortBy: '',
    status: '',
    toDate: '',
    keyword: '',
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

  const handleCreateInvoice = () => {};

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
        spacing={4}
      >
        {!isBreakpointDownMD ? (
          <Grid item md={4} container>
            <FilterMenu dataFilter={dataFilter} setDataFilter={setDataFilter} />
          </Grid>
        ) : null}
        <Grid item xs={12} md={8} container direction="column">
          <Grid container mb={4}>
            <Grid item container xs={12} md={6} alignItems="center">
              <Typography variant="h4">Invoices</Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              justifyContent="flex-end"
              alignItems="center"
            >
              {isBreakpointDownMD ? (
                <FilterDialog
                  dataFilter={dataFilter}
                  setDataFilter={setDataFilter}
                />
              ) : null}
              <CreateInvoiceDialog />
            </Grid>
          </Grid>
          {invoices_list.paging.pageNumber >= 1 && (
            <InvoiceTable
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
