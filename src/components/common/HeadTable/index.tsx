import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { HeadCell, Order } from 'models/global';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SortIcon from '@mui/icons-material/Sort';

interface EnhancedTableProps<T> {
  onRequestSort?: (
    _event: React.MouseEvent<unknown>,
    _property: keyof T
  ) => void;
  rowCount?: number;
  onChangeCheckBoxAll?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: Order;
  orderBy?: string;
  isCheckbox?: boolean;
  headCells: readonly HeadCell<T>[];
  numSelected?: number;
  hasActionColumn: boolean;
}

const HeadTable = <T,>({
  order,
  orderBy,
  isCheckbox,
  onChangeCheckBoxAll,
  onRequestSort,
  headCells,
  numSelected = 0,
  rowCount = 0,
  hasActionColumn,
}: EnhancedTableProps<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort && onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow hover={false}>
        {isCheckbox && (
          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 14,
              lineHeight: '100%',
              color: 'gray.black',
              borderBottom: '3px solid #DEE2E6',
              borderRight: '1px solid #DEE2E6',
            }}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onChangeCheckBoxAll}
            />
          </TableCell>
        )}
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
                index === headCells.length - 1 && !hasActionColumn
                  ? '0px'
                  : '1px solid #DEE2E6',
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
                  orderBy === headCell.id
                    ? order === 'DESCENDING'
                      ? ArrowDownwardIcon
                      : ArrowUpwardIcon
                    : SortIcon
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
        {hasActionColumn ? (
          <TableCell
            align="left"
            padding="none"
            sx={{
              padding: '15px 12px 20px',
              fontWeight: 600,
              fontSize: 14,
              lineHeight: '100%',
              color: 'gray.black',
              borderBottom: '3px solid #DEE2E6',
              borderRight: '0px',
            }}
          >
            Action
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
};

export default HeadTable;
