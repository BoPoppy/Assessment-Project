import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  FormHelperText,
  InputLabel,
  Divider,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchIcon from '@mui/icons-material/Search';
import { FETCH_INVOICE_PARAMS_TYPE } from 'models/invoice';
import moment from 'moment';

type Props = {
  dataFilter: FETCH_INVOICE_PARAMS_TYPE;
  setDataFilter: Dispatch<SetStateAction<FETCH_INVOICE_PARAMS_TYPE>>;
};

const FilterMenu = ({ dataFilter, setDataFilter }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isErrorDate, setIsErrorDate] = useState<boolean>(false);

  const handleClickSearch = () => {
    setDataFilter((oldState) => {
      return {
        ...oldState,
        keyword: searchKeyword,
        pageNum: 1,
      };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFilter((oldState) => {
      return {
        ...oldState,
        status: event.target.name === 'All' ? '' : event.target.name,
        pageNum: 1,
      };
    });
  };

  const onClickSubmitDate = () => {
    if (startDate && endDate && moment(startDate).isAfter(moment(endDate))) {
      setIsErrorDate(true);
      return;
    }
    setIsErrorDate(false);
    setDataFilter((oldData) => {
      return {
        ...oldData,
        fromDate: startDate ? moment(startDate).format('YYYY-MM-DD') : '',
        toDate: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
        pageNum: 1,
      };
    });
  };

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const onClickClearDate = () => {
    setStartDate(null);
    setEndDate(null);
    setIsErrorDate(false);
  };

  useEffect(() => {
    if (dataFilter.fromDate) {
      setStartDate(moment(dataFilter.fromDate, 'YYYY-MM-DD').toDate());
    }
    if (dataFilter.toDate) {
      setEndDate(moment(dataFilter.toDate, 'YYYY-MM-DD').toDate());
    }
    setSearchKeyword(dataFilter.keyword);
  }, [dataFilter.fromDate, dataFilter.keyword, dataFilter.toDate]);

  return (
    <Grid container direction="column">
      <Typography variant="h4" mb={4}>
        Invoices Filter
      </Typography>
      <InputLabel
        htmlFor="Search"
        sx={{
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        Keyword
      </InputLabel>
      <FormControl
        sx={{
          maxWidth: '400px',
        }}
      >
        <TextField
          placeholder="Search"
          id="Search"
          value={searchKeyword}
          onChange={handleChangeKeyword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickSearch} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Divider
        flexItem
        sx={{
          my: 3,
        }}
      />
      <Grid container direction="column">
        <Typography fontWeight="bold">Invoice Status</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={dataFilter.status === ''}
                onChange={handleChange}
                name="All"
              />
            }
            label="All"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dataFilter.status === 'Paid'}
                onChange={handleChange}
                name="Paid"
              />
            }
            label="Paid"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dataFilter.status === 'Unpaid'}
                onChange={handleChange}
                name="Unpaid"
              />
            }
            label="Unpaid"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dataFilter.status === 'Due'}
                onChange={handleChange}
                name="Due"
              />
            }
            label="Due"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={dataFilter.status === 'Overdue'}
                onChange={handleChange}
                name="Overdue"
              />
            }
            label="Overdue"
          />
        </FormGroup>
      </Grid>
      <Divider
        flexItem
        sx={{
          my: 3,
        }}
      />
      <Grid container direction="column" gap={1}>
        <Typography fontWeight="bold">Dates</Typography>
        <Grid container spacing={2}>
          <Grid item container xs={12} direction="column">
            <Typography variant="body2">From</Typography>
            <Grid maxWidth="200px">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={
                  <TextField size="small" InputProps={{ readOnly: true }} />
                }
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} direction="column">
            <Typography variant="body2">To</Typography>
            <Grid maxWidth="200px">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                customInput={
                  <TextField size="small" InputProps={{ readOnly: true }} />
                }
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} gap="6px">
            <Button
              color="secondary"
              variant="outlined"
              onClick={onClickClearDate}
            >
              Clear date
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={onClickSubmitDate}
            >
              Filter Date
            </Button>
          </Grid>
          {isErrorDate && (
            <FormHelperText error={isErrorDate}>
              Please select a valid from date and to date.
            </FormHelperText>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterMenu;
