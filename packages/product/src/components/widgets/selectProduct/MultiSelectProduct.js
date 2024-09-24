import React, {useState, useEffect, useRef} from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import CreateProduct from '../createProduct/CreateProduct';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedProducts, theme) {
  return {
    fontWeight: selectedProducts.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function SelectProduct({
  productList,
  setProductList,
  selectedProducts,
  setSelectedProducts
}) {
  console.log('productList', productList);
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [productCreated, setProductCreated] = useState(false);
  const theme = useTheme();

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setShowOption(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProductById = (pid) => {
    return productList.find(({productId}) => pid === productId)
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedProducts(value);
  };

  useEffect(()=>{
    axios.get('http://localhost:8000').then(function ({data}) {
      setProductList(data.productList);
      setProductCreated(false);
    });
  }, [productCreated]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-select-label">Select Products</InputLabel>
        <Select
          labelId="multiple-select-label"
          id="multiple-select"
          open={showOption}
          onOpen={() => setShowOption(true)}
          onClose={() => setShowOption(false)}
          multiple
          value={selectedProducts}
          onChange={handleChange}
          input={<OutlinedInput id="multiple-select" label="Select Products" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: '30px', overflow: 'auto' }}>
              {selected.map(pid => {
                if (!pid) return;
                const {productId, name} = getProductById(pid);
                return <Chip key={productId} label={name} />
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem role="button" onClick={handleClickOpen}>
            Add New +
          </MenuItem>
          {productList.map((product) => (
            <MenuItem
              key={product.productId}
              value={product.productId}
              style={getStyles(product.name, selectedProducts, theme)}
            >
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CreateProduct type='drawer' open={open} onClose={handleClose} setProductCreated={setProductCreated}/> 
    </div>
  );
}