import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import CreateCustomer from '../createCustomer/CreateCustomer';


export default function SelectCustomer({
  items,
  setItems,
  selectedCustomer,
  onChange
}) {
  const [open, setOpen] = useState(false);
  const [customerCreated, setCustomerCreated] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = ({target}) => {
    const selected = items.find(({customerId}) => customerId === target.value);
    console.log(selected);
    onChange(selected);
  }

  useEffect(()=>{
    axios.get('http://localhost:8001').then(function ({data}) {
      setItems(data.customerList);
      setCustomerCreated(false);
    });
  }, [customerCreated]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="customer-select-helper-label">Select Customer</InputLabel>
        <Select
          labelId="customer-select-helper-label"
          label="Select Customer"
          onChange={onChangeHandler}
        >
          <Button sx={{width: '100%'}} variant="text" onClick={() => setOpen(true)}>
            <em>Add New +</em>
          </Button>
          {
            items.map(({name, customerId}) => <MenuItem key={customerId} value={customerId}>{name}</MenuItem>)
          }
        </Select>
      </FormControl>
      <CreateCustomer type='drawer' open={open} onClose={handleClose} setCustomerCreated={setCustomerCreated} setCustomerList={setItems}/> 
    </div>
  );
}