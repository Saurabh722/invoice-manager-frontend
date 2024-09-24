import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import CreateProduct from './../createProduct/CreateProduct';

export default function SelectProduct({
  items,
  setItems,
  selectedProduct,
  onChange
}) {
  console.log('selectedProduct', selectedProduct);
  console.log('items', items);
  console.log('setItems', typeof setItems);
  const [open, setOpen] = useState(false);
  const [showOtion, setShowOtion] = useState(false);
  const [productCreated, setProductCreated] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateNew = () => {
    setShowOtion(false);
    setOpen(true);
  };

  const onChangeHandler = ({target}) => {
    const selected = items.find(({productId}) => productId === target.value);
    onChange(selected);
  }

  useEffect(()=>{
    axios.get('http://localhost:8000').then(function ({data}) {
      setItems(data.productList);
      setProductCreated(false);
    });
  }, [productCreated]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="product-select-helper-label">Select Product</InputLabel>
        <Select
          labelId="product-select-helper-label"
          label="Select Product"
          onChange={onChangeHandler}
          open={showOtion}
          onOpen={()=>setShowOtion(true)}
          onClose={()=>setShowOtion(false)}
        >
          <Button sx={{width: '100%'}} variant="text" onClick={handleCreateNew}>
            <em>Add New +</em>
          </Button>
          {
            items.map(({name, productId}) => <MenuItem key={productId} value={productId}>{name}</MenuItem>)
          }
        </Select>
      </FormControl>
      <CreateProduct type='drawer' open={open} onClose={handleClose} setProductCreated={setProductCreated} setProductList={setItems}/> 
    </div>
  );
}