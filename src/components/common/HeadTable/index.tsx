import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { HeadCell, Order } from 'models/global';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';

interface EnhancedTableProps<T> {
  onRequestSort?: (
    _event: React.MouseEvent<unknown>,
    _property: keyof T
  ) => void;
  rowCount?: number;
  onChangeCheckBoxAll?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeadCell<T>[];
}

const HeadTable = <T,>({
  order,
  orderBy,
  onRequestSort,
  headCells,
}: EnhancedTableProps<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort && onRequestSort(event, property);
    };

  console.log(order === 'DESCENDING');

  return (
    <TableHead>
      <TableRow hover={false}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id as string}
            sortDirection={
              orderBy === headCell.id
                ? order === 'ASCENDING'
                  ? 'asc'
                  : 'desc'
                : false
            }
            sx={{
              padding: '15px 12px 20px',
              fontWeight: 600,
              fontSize: 14,
              lineHeight: '100%',
              color: 'gray.black',
              borderBottom: '3px solid #DEE2E6',
              borderRight:
                index === headCells.length - 1 ? '0px' : '1px solid #DEE2E6',
            }}
          >
            {headCell.isSort ? (
              <TableSortLabel
                active={true}
                direction={
                  orderBy === headCell.id
                    ? order === 'ASCENDING'
                      ? 'asc'
                      : 'desc'
                    : 'asc'
                }
                onClick={createSortHandler(headCell.id)}
                IconComponent={
                  orderBy === headCell.id ? ArrowDownwardIcon : SortIcon
                }
                hideSortIcon={true}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeadTable;
