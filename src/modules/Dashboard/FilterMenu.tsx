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
} from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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
      <Typography>Invoices</Typography>
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
      <Typography>Invoice Status</Typography>
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
              checked={dataFilter.status === 'Overdue'}
              onChange={handleChange}
              name="Overdue"
            />
          }
          label="Overdue"
        />
      </FormGroup>
      <Grid container direction="column">
        <Typography>Dates</Typography>
        <Grid container gap="6px">
          <Typography>From</Typography>
          <Grid maxWidth="130px">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={
                <TextField size="small" InputProps={{ readOnly: true }} />
              }
            />
          </Grid>
          <Typography>To</Typography>
          <Grid maxWidth="130px">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={
                <TextField size="small" InputProps={{ readOnly: true }} />
              }
            />
          </Grid>
          <Button
            color="secondary"
            variant="contained"
            onClick={onClickSubmitDate}
          >
            Submit
          </Button>
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
