import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type FormDataType = {
  invoice_refference_number: string;
};

type Props = {};

const CreateInvoiceDialog = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      invoice_refference_number: '',
    },
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
    console.log(data);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Create New Invoice
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <form id="form-create-invoice" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field }) => (
                <Grid container direction="column">
                  <InputLabel htmlFor="reference_number">
                    Reference Number
                  </InputLabel>
                  <TextField
                    {...field}
                    placeholder="Reference Number"
                    id="reference_number"
                  />
                </Grid>
              )}
              name="invoice_refference_number"
              control={control}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button type="submit" form="form-create-invoice" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateInvoiceDialog;
