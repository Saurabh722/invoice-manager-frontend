import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
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
    setProduct({
      ...product,
      [target.name]: target.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/product', {...product}).then(function ({data}) {
      console.log(data);
    });
    handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: onSubmitHandler
        }}
      >
        <DialogTitle>New Product Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: 'calc(100% - 1rem)' } }}
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={product.name} onChange={onChangeHandler}/>
            <TextField id="outlined-basic" label="Category" variant="outlined" name="category" value={product.category} onChange={onChangeHandler}/>
            <TextField
              id="outlined-basic" 
              label="Price"
              variant="outlined"
              name="price" 
              value={product.price}
              onChange={onChangeHandler}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
              }}
            />
            <TextField id="outlined-basic" label="Quantity" variant="outlined" name="quantity" value={product.quantity} onChange={onChangeHandler}/>
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
