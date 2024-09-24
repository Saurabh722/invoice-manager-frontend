import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const initState = {
  name: '',
  email: '',
  phone: '',
  zip: ''
}

const getState = (state) => {
  return state?.customerId ? state : initState;
}
export default function FormDialog({type, onClose, open, selected, setCustomerList}) {
  console.log('type-selected', selected);
  const [customer, setCustomer] = useState(getState(selected));
  const isDrawer = type === 'drawer';

  const onChangeHandler = ({target}) => {
    setCustomer({
      ...customer,
      [target.name]: target.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (selected?.customerId) {
      axios.put(`http://localhost:8001/customer/${customer?.customerId}`, {customer}).then(function ({data}) {
      console.log('onSubmitHandler', data);
      setCustomerList(data);
    });
  } else {
      axios.post(`http://localhost:8001/customer`, {...customer}).then(function ({data}) {
      console.log('onSubmitHandler', data);
      setCustomerList(data);
    });
  }
    onClose();
  }

  let DialogContainer = Dialog;
  let actionProps = {
    type: "submit"
  }
  let props = {
    open,
    onClose,
    PaperProps: {
        component: 'form',
        onSubmit: onSubmitHandler
    }
  };

  if (isDrawer) {
    DialogContainer = Drawer;
    props = { anchor:'right',
      open,
      onClose
    }
    actionProps = {
      onClick: onSubmitHandler
    }
  }

  useEffect(() => {
    selected && setCustomer(selected);
  },[selected]);

  return (
    <React.Fragment>
      <DialogContainer {...props}>
        <DialogTitle>New Customer Details</DialogTitle>
        <DialogContent sx={ isDrawer ? {maxWidth: '420px'} : null}>
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
        </DialogContent>
        <DialogActions sx={{padding: '0px 31px 30px', justifyContent: 'space-between'}}>
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <Button variant="outlined" {...actionProps}>{selected ? 'Update': 'Create'}</Button>
        </DialogActions>
      </DialogContainer>
    </React.Fragment>
  );
}
