import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

export default function CreateCustomerModel() {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = ({target}) => {
    setCustomer({
      ...customer,
      [target.name]: target.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8001/customer', {...customer}).then(function ({data}) {
      console.log(data);
    });
    handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: onSubmitHandler
        }}
      >
        <DialogTitle>New customer Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: 'calc(100% - 1rem)' } }}
            autoComplete="off"
          >
            <TextField label="Name" variant="outlined" name="name" value={customer.name} onChange={onChangeHandler}/>
            <TextField label="Email" variant="outlined" name="email" value={customer.email} onChange={onChangeHandler}/>
            <TextField label="Phone" variant="outlined" name="phone" value={customer.phone} onChange={onChangeHandler}/>
            <TextField label="ZIP Code" variant="outlined" name="zip" value={customer.zip} onChange={onChangeHandler}/>
          </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{padding: '0px 31px 30px', justifyContent: 'space-between'}}>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
          <Button variant="outlined" type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
