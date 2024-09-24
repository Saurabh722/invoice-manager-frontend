import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const initState = {
  name: "",
  category: "",
  price: "",
  quantity: "",
}

const getState = (state) => {
  return state?.productId ? state : initState;
}
export default function CreateProduct({type, onClose, open, selected, setProductList}) {
  console.log('type-selected', typeof setProductList);
  const [product, setProduct] = useState(getState(selected));
  const isDrawer = type === 'drawer';

  const onChangeHandler = ({target}) => {
    setProduct({
      ...product,
      [target.name]: target.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (selected?.productId) {
        axios.put(`http://localhost:8000/product/${product.productId}`, {product}).then(function ({data}) {
        console.log('onSubmitHandler', data);
        setProductList(data);
      });
    } else {
        axios.post(`http://localhost:8000/product`, {...product}).then(function ({data}) {
        console.log('onSubmitHandler', data);
        setProductList(data);
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
    selected && setProduct(selected);
  },[selected]);

  return (
    <React.Fragment>
      <DialogContainer {...props}>
        <DialogTitle>New Product Details</DialogTitle>
        <DialogContent sx={ isDrawer ? {maxWidth: '420px'} : null}>
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
        </DialogContent>
        <DialogActions sx={{padding: '0px 31px 30px', justifyContent: 'space-between'}}>
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <Button variant="outlined" {...actionProps}>{selected ? 'Update': 'Create'}</Button>
        </DialogActions>
      </DialogContainer>
    </React.Fragment>
  );
}
