import { FETCH_INVOICE_PARAMS_TYPE } from 'models/invoice';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';

type FormFilterDataType = {
  keyword: string;
  fromDate: Date | null;
  toDate: Date | null;
  status: string;
};

type Props = {
  dataFilter: FETCH_INVOICE_PARAMS_TYPE;
  setDataFilter: Dispatch<SetStateAction<FETCH_INVOICE_PARAMS_TYPE>>;
};

const FilterDialog = ({ dataFilter, setDataFilter }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormFilterDataType>({
    defaultValues: {
      keyword: '',
      fromDate: null,
      toDate: null,
      status: '',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    reset({
      fromDate: dataFilter.fromDate
        ? moment(dataFilter.fromDate, 'YYYY-MM-DD').toDate()
        : null,
      toDate: dataFilter.toDate
        ? moment(dataFilter.toDate, 'YYYY-MM-DD').toDate()
        : null,
      keyword: dataFilter.keyword,
      status: dataFilter.status,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: FormFilterDataType) => {
    setDataFilter((oldData) => {
      return {
        ...oldData,
        fromDate: data.fromDate
          ? moment(data.fromDate).format('YYYY-MM-DD')
          : '',
        toDate: data.toDate ? moment(data.toDate).format('YYYY-MM-DD') : '',
        keyword: data.keyword,
        status: data.status,
        pageNum: 1,
      };
    });
    handleClose();
  };

  const onClearDate = () => {
    setValue('fromDate', null);
    setValue('toDate', null);
  };

  useEffect(() => {
    reset({
      fromDate: dataFilter.fromDate
        ? moment(dataFilter.fromDate, 'YYYY-MM-DD').toDate()
        : null,
      toDate: dataFilter.toDate
        ? moment(dataFilter.toDate, 'YYYY-MM-DD').toDate()
        : null,
      keyword: dataFilter.keyword,
      status: dataFilter.status,
    });
  }, [
    dataFilter.fromDate,
    dataFilter.keyword,
    dataFilter.status,
    dataFilter.toDate,
    reset,
  ]);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open filter
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle id="alert-dialog-title">Filter Popup</DialogTitle>
        <DialogContent>
          <form id="form-filter" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field }) => (
                <Grid container direction="column" mb={2}>
                  <InputLabel
                    htmlFor="Keyword"
                    sx={{
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Keyword
                  </InputLabel>
                  <TextField {...field} placeholder="Keyword" id="Keyword" />
                </Grid>
              )}
              name="keyword"
              control={control}
            />
            <Grid container mb={2}>
              <Controller
                render={({ field }) => (
                  <Grid container direction="column">
                    <Typography fontWeight="bold">Invoice Status</Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value === ''}
                            onChange={() => field.onChange('')}
                            name="All"
                          />
                        }
                        label="All"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value === 'Paid'}
                            onChange={(event) =>
                              field.onChange(event.target.name)
                            }
                            name="Paid"
                          />
                        }
                        label="Paid"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value === 'Unpaid'}
                            onChange={(event) =>
                              field.onChange(event.target.name)
                            }
                            name="Unpaid"
                          />
                        }
                        label="Unpaid"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value === 'Due'}
                            onChange={(event) =>
                              field.onChange(event.target.name)
                            }
                            name="Due"
                          />
                        }
                        label="Due"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value === 'Overdue'}
                            onChange={(event) =>
                              field.onChange(event.target.name)
                            }
                            name="Overdue"
                          />
                        }
                        label="Overdue"
                      />
                    </FormGroup>
                  </Grid>
                )}
                name="status"
                control={control}
              />
            </Grid>
            <Grid container direction="column">
              <Typography fontWeight="bold">Dates</Typography>
              <Grid container direction="column" mt={1}>
                <Typography variant="body2">From</Typography>
                <Controller
                  name="fromDate"
                  control={control}
                  rules={{
                    validate: {
                      mustBeforeEnd: (val) => {
                        if (getValues('toDate')) {
                          if (
                            moment(val).isAfter(moment(getValues('toDate')))
                          ) {
                            return 'Please select a valid from date';
                          }
                        }
                        return true;
                      },
                    },
                  }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      customInput={
                        <TextField
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      }
                    />
                  )}
                />
              </Grid>
              <Grid container direction="column" mt={1}>
                <Typography variant="body2">To</Typography>
                <Controller
                  name="toDate"
                  control={control}
                  rules={{
                    validate: {
                      mustAfterTo: (val) => {
                        if (getValues('fromDate')) {
                          if (
                            !moment(val).isAfter(moment(getValues('fromDate')))
                          ) {
                            return 'Please select a valid to date';
                          }
                        }
                        return true;
                      },
                    },
                  }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      customInput={
                        <TextField
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            {(!!errors.fromDate || !!errors.toDate) && (
              <FormHelperText error={!!errors.fromDate || !!errors.toDate}>
                Please select a valid from date and to date.
              </FormHelperText>
            )}
            <Button
              onClick={onClearDate}
              variant="outlined"
              sx={{
                mt: 2,
              }}
            >
              Clear Date
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <Button type="submit" form="form-filter" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterDialog;
