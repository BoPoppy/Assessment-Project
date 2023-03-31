import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {};

const FilterMenu = (props: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Grid container direction="column" maxWidth="400px">
      <Typography>Invoices</Typography>
      <TextField placeholder="Search invoice" />
      <Typography>Invoice Status</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked name="All" />}
          label="All"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked name="Paid" />}
          label="Paid"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked name="Unpaid" />}
          label="Unpaid"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked name="Overdue" />}
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
