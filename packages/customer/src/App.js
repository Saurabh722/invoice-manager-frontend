import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import CreateCustomerModal from './components/widgets/createCustomer/CreateCustomerModal';
import CustomerList from './components/CustomertList';

const generateClassName = createGenerateClassName({
  customerionPrefix: 'po',
});

export default ({ history }) => {
  const [customerList, setCustomerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const onEdit = (cid) => {
    setSelected(customerList.find(({customerId}) => customerId === cid))
    setOpen(true);
  }

  useEffect(()=>{
    axios.get('http://localhost:8001').then(function ({data}) {
      console.log('data', data);
      setCustomerList(data.customerList);
    });
  }, []);
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <h1>Customer</h1>
        <CreateCustomerModal type='drawer' open={open} setOpen={setOpen} onEdit={onEdit} selected={selected} setCustomerList={setCustomerList}/>
        <CustomerList customerList={customerList} setCustomerList={setCustomerList} onEdit={onEdit} setSelected={setSelected}/>
      </StylesProvider>
    </div>
  );
};
