import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Table from './Table';
import CreateCustomer from '../widgets/CreateCustomer';
import CreateProduct from '../widgets/CreateProduct';

export default function InvoiceApp({type}) {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers,] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  // console.log('orders', orders);

  const onDelete = (productId) => {
    console.log(productId);
    axios.delete(`http://localhost:8000/product/${productId}`, {productId: productId}).then(function ({data}) {
      console.log(data);
      setItems(data);
    });
  }

  const actions = {
    delete: {
      label: 'X',
      onClick: onDelete,
    },
  }

  const updateOrder = (product) => {
    console.log(product)
    setSelectedItem(product);
    setOrders([...orders, {
      productName: product.name,
      productId: product.productId,
      description: '',
      quantity: 1,
      rate: product.price,
      amount: product.price,
    }]);
  }

  const updateQuantity = (pid, quantity) => {
    setOrders(orders.map((order) => {
      if (pid !== order.productId) {
        return order;
      }
      return {...order, quantity, amount: (quantity * parseInt(order.rate))}
    }));
  }

  useEffect(()=>{
    console.log('useEffect productList', items)
    axios.get('http://localhost:8000').then(function ({data}) {
      setItems(data.productList);
    });
  }, []);

  useEffect(()=>{
    console.log('useEffect CustomerList', items)
    axios.get('http://localhost:8001').then(function ({data}) {
      console.log(data.customerList);
      setCustomers(data.customerList);
    });
  }, []);

  const onSaveInvoice = () => {
    if (!selectedCustomer.customerId || !orders.length) {
      throw new Error('Some thing went wrong');
    }
    const invoice = {
      customerId: selectedCustomer.customerId,
      customerName: selectedCustomer.name,
      status: 0,
      items: orders,
      amount: orders.reduce((a, {amount}) => a + parseInt(amount), 0 )
    }

    console.log(invoice);
    axios.post(`http://localhost:8002/invoice`, {...invoice}).then(function ({data}) {
      console.log('onSubmitHandler', data);
    });
    
  } 

  const createCustomerProps = {
    items: customers,
    setItems:setCustomers,
    selectedCustomer,
    onChange: setSelectedCustomer,
  }

  const createProductProps = {
    items,
    setItems,
    selectedItem: selectedItem,
    onChange: updateOrder,
  }

  const heads = ['Products', 'Description', 'Quantity', 'Rate', 'Amount'];

  return (
    <>
      <h2>Invoice for {selectedCustomer.name}</h2>
      <div>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
         <CreateCustomer {...createCustomerProps}/>
         <CreateProduct {...createProductProps}/>
        </Box>
        <Box sx={{minHeight: 400}}>
          <Table heads={heads} rows={orders} actions={actions} ignore={[]} updateQuantity={updateQuantity}/>
        </Box>
        <Box sx={{padding: '20px 50px', display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant="contained" onClick={onSaveInvoice}>Save</Button>
        </Box>
      </div>
    </>
  )
}