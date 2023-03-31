import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchIcon from '@mui/icons-material/Search';
import { FETCH_INVOICE_PARAMS_TYPE } from 'models/invoice';

type Props = {
  dataFilter: FETCH_INVOICE_PARAMS_TYPE;
  setDataFilter: Dispatch<SetStateAction<FETCH_INVOICE_PARAMS_TYPE>>;
};

const FilterMenu = ({ dataFilter, setDataFilter }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickSearch = () => {
    setDataFilter((oldState) => {
      return {
        ...oldState,
        keyword: inputRef.current?.value || '',
      };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFilter((oldState) => {
      return {
        ...oldState,
        status: event.target.name === 'All' ? '' : event.target.name,
      };
    });
  };

  return (
    <Grid container direction="column" maxWidth="400px">
      <Typography>Invoices</Typography>
      <TextField
        placeholder="Search"
        id="Search"
        inputRef={inputRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickSearch}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
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
          <Button color="secondary" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterMenu;
