import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
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
  List,
  ListItem,
  FormHelperText,
  dialogClasses,
  useTheme,
  textFieldClasses,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch } from 'store/hooks';
import { CREATE_NEW_INVOICE_REQUEST } from 'store/reducers/invoices/actionTypes';
import { CREATE_INVOICE_BODY } from 'models/invoice';

type FormDataType = {
  invoice_reference: string;
  invoice_refference_number: string;
  invoice_date: Date | null;
  invoice_due_date: Date | null;
  invoice_description: string;
  invoice_item: {
    item_reference: string;
    item_description: string;
    item_quantity: number;
    rate: string;
    item_name: string;
  }[];
};

type Props = {};

const CreateInvoiceDialog = (_props: Props) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
    reset({
      invoice_reference: '',
      invoice_refference_number: '',
      invoice_date: null,
      invoice_description: '',
      invoice_due_date: null,
      invoice_item: [
        {
          item_description: generateInvoiceItem().description,
          item_name: '',
          item_quantity: generateInvoiceItem().quantity,
          item_reference: generateInvoiceItem().itemReference,
          rate: generateInvoiceItem().rate,
        },
      ],
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleSubmit, reset, control, getValues } = useForm<FormDataType>({
    defaultValues: {
      invoice_reference: '',
      invoice_refference_number: '',
      invoice_date: null,
      invoice_description: '',
      invoice_due_date: null,
      invoice_item: [
        {
          item_description: generateInvoiceItem().description,
          item_name: '',
          item_quantity: generateInvoiceItem().quantity,
          item_reference: generateInvoiceItem().itemReference,
          rate: generateInvoiceItem().rate,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'invoice_item', // unique name for your Field Array
  });

  function generateInvoiceItem() {
    const itemReference = Math.random().toString(36).substring(2, 10); // generate a random string for item reference
    const description = 'Product ' + Math.floor(Math.random() * 100); // generate a random product description
    const quantity = Math.floor(Math.random() * 10) + 1; // generate a random quantity between 1 and 10
    const rate = (Math.random() * 1000).toFixed(2); // generate a random rate between 0 and 1000 with 2 decimal places

    return {
      itemReference,
      description,
      quantity,
      rate,
    };
  }

  const onSubmit = (data: FormDataType) => {
    const bodySubmit: CREATE_INVOICE_BODY = {
      invoices: [
        {
          invoiceReference: data.invoice_refference_number,
          invoiceNumber: data.invoice_refference_number,
          currency: 'GBP',
          invoiceDate: moment(data.invoice_date).format('YYYY-MM-DD'),
          dueDate: moment(data.invoice_due_date).format('YYYY-MM-DD'),
          description: data.invoice_description,
          items: data.invoice_item.map((item) => {
            return {
              itemReference: item.item_reference,
              description: item.item_description,
              quantity: item.item_quantity,
              rate: item.rate,
              itemName: item.item_name,
            };
          }),
        },
      ],
    };
    dispatch({
      type: CREATE_NEW_INVOICE_REQUEST,
      payload: {
        data: bodySubmit,
      },
    });
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        data-testid="create-invoice-btn"
      >
        Create New Invoice
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            width: '100%',
          },
        }}
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">Create Invoice</DialogTitle>
        <DialogContent>
          <form id="form-create-invoice" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field, fieldState }) => (
                <Grid container direction="column" mb={1}>
                  <InputLabel htmlFor="invoice_reference">
                    Invoice Reference
                  </InputLabel>
                  <TextField
                    {...field}
                    placeholder="Invoice Reference"
                    id="invoice_reference"
                    error={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </Grid>
              )}
              name="invoice_reference"
              control={control}
              rules={{
                required: 'This field is required!',
                maxLength: {
                  value: 50,
                  message: 'Maximum length of 50 characters',
                },
              }}
            />
            <Controller
              render={({ field, fieldState }) => (
                <Grid container direction="column" mb={1}>
                  <InputLabel htmlFor="invoice_refference_number">
                    Invoice Number
                  </InputLabel>
                  <TextField
                    {...field}
                    placeholder="Invoice Number"
                    id="invoice_refference_number"
                    error={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </Grid>
              )}
              name="invoice_refference_number"
              control={control}
              rules={{
                required: 'This field is required!',
                maxLength: {
                  value: 50,
                  message: 'Maximum length of 50 characters',
                },
              }}
            />
            <Grid container mb={1}>
              <Controller
                name="invoice_date"
                control={control}
                rules={{
                  validate: {
                    mustAfterTo: (val) => {
                      if (getValues('invoice_due_date')) {
                        if (
                          moment(val).isAfter(
                            moment(getValues('invoice_due_date'))
                          ) ||
                          moment(val).isAfter(moment())
                        ) {
                          return 'Please select a valid invoice date';
                        }
                      }
                      return true;
                    },
                  },
                  required: 'This field is required!',
                }}
                render={({ field, fieldState }) => (
                  <Grid container direction="column">
                    <InputLabel htmlFor="invoice_date">Invoice Date</InputLabel>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      customInput={
                        <TextField
                          size="small"
                          fullWidth
                          id="invoice_date"
                          InputProps={{ readOnly: true }}
                          error={!!fieldState.error}
                        />
                      }
                    />
                    {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </Grid>
                )}
              />
            </Grid>
            <Grid container mb={1}>
              <Controller
                name="invoice_due_date"
                control={control}
                rules={{
                  validate: {
                    mustAfterTo: (val) => {
                      if (getValues('invoice_date')) {
                        if (
                          !moment(val).isAfter(
                            moment(getValues('invoice_date'))
                          ) ||
                          !moment(val).isAfter(moment()) ||
                          moment(val).isSame(
                            moment(getValues('invoice_date')),
                            'date'
                          )
                        ) {
                          return 'Please select a valid due date';
                        }
                      }
                      return true;
                    },
                  },
                  required: 'This field is required!',
                }}
                render={({ field, fieldState }) => (
                  <Grid container direction="column">
                    <InputLabel htmlFor="invoice_due_date">
                      Invoice Due Date
                    </InputLabel>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      customInput={
                        <TextField
                          size="small"
                          fullWidth
                          InputProps={{ readOnly: true }}
                          error={!!fieldState.error}
                        />
                      }
                    />
                    {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </Grid>
                )}
              />
            </Grid>
            <Controller
              render={({ field, fieldState }) => (
                <Grid container direction="column" mb={1}>
                  <InputLabel htmlFor="invoice_description">
                    Invoice Description
                  </InputLabel>
                  <TextField
                    {...field}
                    placeholder="Invoice Description"
                    id="invoice_description"
                    multiline
                    maxRows={5}
                    error={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </Grid>
              )}
              name="invoice_description"
              control={control}
              rules={{
                required: 'This field is required!',
                maxLength: {
                  value: 250,
                  message: 'Maximum length of 250 characters',
                },
              }}
            />
            <Grid container mb={1} mt={3} direction="column">
              <Typography variant="h6">Invoice Items</Typography>
              <List
                sx={{
                  width: '100%',
                }}
              >
                {fields.map((item, index) => (
                  <ListItem key={item.id}>
                    <Grid container direction="column">
                      <Controller
                        render={({ field }) => (
                          <Grid container direction="column" mb={1}>
                            <InputLabel htmlFor="item_reference">
                              Reference
                            </InputLabel>
                            <TextField
                              {...field}
                              placeholder="Item Reference"
                              id="item_reference"
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                [`&.${textFieldClasses.root}`]: {
                                  '& > div > input': {
                                    '&:read-only': {
                                      bgcolor: 'lightgray',
                                    },
                                  },
                                },
                              }}
                            />
                          </Grid>
                        )}
                        name={`invoice_item.${index}.item_reference`}
                        control={control}
                      />
                      <Controller
                        render={({ field, fieldState }) => (
                          <Grid container direction="column" mb={1}>
                            <InputLabel htmlFor="item_name">
                              Item Name
                            </InputLabel>
                            <TextField
                              {...field}
                              placeholder="Item Name"
                              id="item_name"
                              error={!!fieldState.error}
                            />
                            {fieldState.error && (
                              <FormHelperText error>
                                {fieldState.error.message}
                              </FormHelperText>
                            )}
                          </Grid>
                        )}
                        name={`invoice_item.${index}.item_name`}
                        control={control}
                        rules={{
                          required: 'This field is required.',
                        }}
                      />
                      <Controller
                        render={({ field }) => (
                          <Grid container direction="column" mb={1}>
                            <InputLabel htmlFor="item_description">
                              Item Description
                            </InputLabel>
                            <TextField
                              {...field}
                              sx={{
                                [`&.${textFieldClasses.root}`]: {
                                  '& > div > input': {
                                    '&:read-only': {
                                      bgcolor: 'lightgray',
                                    },
                                  },
                                },
                              }}
                              placeholder="Item Description"
                              id="item_description"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        )}
                        name={`invoice_item.${index}.item_description`}
                        control={control}
                      />
                      <Controller
                        render={({ field }) => (
                          <Grid container direction="column" mb={1}>
                            <InputLabel htmlFor="item_quantity">
                              Quantity
                            </InputLabel>
                            <TextField
                              {...field}
                              placeholder="Item Quantity"
                              id="item_quantity"
                              sx={{
                                [`&.${textFieldClasses.root}`]: {
                                  '& > div > input': {
                                    '&:read-only': {
                                      bgcolor: 'lightgray',
                                    },
                                  },
                                },
                              }}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        )}
                        name={`invoice_item.${index}.item_quantity`}
                        control={control}
                      />
                      <Controller
                        render={({ field }) => (
                          <Grid container direction="column" mb={1}>
                            <InputLabel htmlFor="item_rate">Rate</InputLabel>
                            <TextField
                              {...field}
                              placeholder="Item Rate"
                              id="item_rate"
                              sx={{
                                [`&.${textFieldClasses.root}`]: {
                                  '& > div > input': {
                                    '&:read-only': {
                                      bgcolor: 'lightgray',
                                    },
                                  },
                                },
                              }}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        )}
                        name={`invoice_item.${index}.rate`}
                        control={control}
                      />
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" form="form-create-invoice" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateInvoiceDialog;
