import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import HeadTable from 'components/common/HeadTable';
import { HeadCell } from 'models/global';
import { FETCH_INVOICE_PARAMS_TYPE, INVOICE_DATA } from 'models/invoice';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    isSort: false,
    label: 'Invoice Date',
  },
  {
    id: 'dueDate',
    numeric: false,
    disablePadding: true,
    isSort: false,
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
    isSort: true,
    numeric: true,
    label: 'Status',
  },
  {
    id: 'customer',
    disablePadding: true,
    isSort: true,
    numeric: true,
    label: 'Customer Name',
  },
  {
    id: 'referenceNo',
    disablePadding: true,
    isSort: true,
    numeric: true,
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
      <TableCell>{row.createdAt}</TableCell>
      <TableCell>{row.dueDate}</TableCell>
      <TableCell>{row.totalAmount}</TableCell>
      <TableCell>{row.status[0].key}</TableCell>
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
      };
    });
  };

  const fetchMoreData = () => {
    setDataFilter((oldState) => {
      return {
        ...oldState,
        pageNum: oldState.pageNum + 1,
        pageSize: invoices_list.paging.pageSize,
      };
    });
  };

  return (
    <Grid container>
      <InfiniteScroll
        dataLength={invoices_list.data.length}
        next={fetchMoreData}
        hasMore={true}
        scrollableTarget="scrollableDiv"
        loader={<div>loading...</div>}
      >
        <TableContainer
          sx={{
            maxHeight: 'calc(100vh - 64px - 2 * 45px)',
          }}
          id="scrollableDiv"
        >
          <Table>
            <HeadTable<INVOICE_DATA>
              order={dataFilter.ordering}
              orderBy={dataFilter.sortBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
              hasActionColumn={false}
            />
            <TableBody>
              {invoices_list.data.map((row) => (
                <InvoiceRow row={row} key={row.invoiceId} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </Grid>
  );
};

export default InvoiceTable;
