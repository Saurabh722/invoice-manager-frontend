import React, { useState } from 'react';
import CreateProduct from './CreateProduct';
import Button from '@mui/material/Button';

export default function FormDialog({type, open, setOpen, selected, setProductList, onEdit}) {
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
        Create New Product
      </Button>
      <CreateProduct type={type} open={open} onClose={handleClose} selected={selected} setProductList={setProductList}/> 
    </>
  )
}
