import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Chip,
} from '@mui/material';
import HeadTable from 'components/common/HeadTable';
import { HeadCell } from 'models/global';
import { FETCH_INVOICE_PARAMS_TYPE, INVOICE_DATA } from 'models/invoice';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';

const headCells: readonly HeadCell<INVOICE_DATA>[] = [
  {
    id: 'invoiceNumber',
    numeric: false,
    disablePadding: true,
    isSort: false,
    label: 'Number',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    isSort: true,
    label: 'Invoice Date',
  },
  {
    id: 'dueDate',
    numeric: false,
    disablePadding: true,
    isSort: true,
    label: 'Due Date',
  },
  {
    id: 'totalAmount',
    disablePadding: true,
    isSort: true,
    numeric: true,
    label: 'Total Amount',
  },
  {
    id: 'status',
    disablePadding: true,
    isSort: false,
    numeric: false,
    label: 'Status',
  },
  {
    id: 'customer',
    disablePadding: true,
    isSort: false,
    numeric: false,
    label: 'Customer Name',
  },
  {
    id: 'referenceNo',
    disablePadding: true,
    isSort: false,
    numeric: false,
    label: 'Reference Number',
  },
];

type CourseRowProps = {
  row: INVOICE_DATA;
};

const InvoiceRow = ({ row }: CourseRowProps) => {
  return (
    <TableRow key={row.invoiceId}>
      <TableCell>{row.invoiceNumber}</TableCell>
      <TableCell>{moment(row.createdAt).format('YYYY-MM-DD')}</TableCell>
      <TableCell>{row.dueDate}</TableCell>
      <TableCell>{row.totalAmount}</TableCell>
      <TableCell>
        <Chip
          label={row.status[0].key}
          color={
            row.status[0].key === 'Paid'
              ? 'success'
              : row.status[0].key === 'Unpaid'
              ? 'warning'
              : row.status[0].key === 'Due'
              ? 'info'
              : 'error'
          }
        />
      </TableCell>
      <TableCell
        sx={{
          minWidth: '190px',
        }}
      >
        {row.customer?.name || ''}
      </TableCell>
      <TableCell>{row.referenceNo}</TableCell>
    </TableRow>
  );
};

type Props = {
  dataFilter: FETCH_INVOICE_PARAMS_TYPE;
  setDataFilter: Dispatch<SetStateAction<FETCH_INVOICE_PARAMS_TYPE>>;
};

const InvoiceTable = ({ dataFilter, setDataFilter }: Props) => {
  const { invoices_list } = useAppSelector((state) => state.invoices);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof INVOICE_DATA
  ) => {
    const isAsc =
      dataFilter.sortBy === property && dataFilter.ordering === 'ASCENDING';
    setDataFilter((oldState) => {
      return {
        ...oldState,
        ordering: isAsc ? 'DESCENDING' : 'ASCENDING',
        sortBy: property,
        pageNum: 1,
      };
    });
  };

  // const fetchMoreData = () => {
  //   setDataFilter((oldState) => {
  //     return {
  //       ...oldState,
  //       pageNum: oldState.pageNum + 1,
  //       pageSize: invoices_list.paging.pageSize,
  //     };
  //   });
  // };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setDataFilter((oldState) => {
      return {
        ...oldState,
        pageNum: newPage + 1,
      };
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataFilter((oldState) => {
      return {
        ...oldState,
        pageNum: 1,
        pageSize: +event.target.value,
      };
    });
  };

  return (
    <Grid container>
      <TableContainer
        sx={{
          maxHeight: 'calc(100vh - 64px - 2 * 100px)',
        }}
        id="scrollableDiv"
      >
        <Table stickyHeader>
          <HeadTable<INVOICE_DATA>
            order={dataFilter.ordering}
            orderBy={dataFilter.sortBy}
            headCells={headCells}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {invoices_list.data.map((row) => (
              <InvoiceRow row={row} key={row.invoiceId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end">
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={invoices_list.paging.totalRecords}
          rowsPerPage={invoices_list.paging.pageSize}
          page={invoices_list.paging.pageNumber - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default InvoiceTable;
