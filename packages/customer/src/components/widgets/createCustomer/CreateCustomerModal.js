import React, { useState } from 'react';
import CreateCustomer from './CreateCustomer';
import Button from '@mui/material/Button';

export default function FormDialog({type, open, setOpen, selected, setCustomerList, onEdit}) {
  console.log('selected', selected);
  const handleClickOpen = () => {
    onEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Customer
      </Button>
      <CreateCustomer type={type} open={open} onClose={handleClose} selected={selected} setCustomerList={setCustomerList}/> 
    </>
  )
}
