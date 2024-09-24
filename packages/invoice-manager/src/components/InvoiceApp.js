import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProduct from '../widgets/CreateProduct';
import Table from './Table';

const invoiceData = [
  {
    invoiceId:'1',
    customerId: 'c1',
    customerName: 'customer1',
    items: 1,
    amount: 10,
  },
  {
    id:'2',
    customerId: 'c2',
    customerName: 'customer2',
    items: 2,
    amount: 20,
  },
  {
    id:'3',
    customerId: 'c3',
    customerName: 'customer3',
    items: 3,
    amount: 30,
  }
]

export default function InvoiceApp() {
  const [invoices, setInvoices] = useState(invoiceData);

  const displayData = invoices.map(({
    customerName,
    invoiceId,
    items,
    status,
    amount
  }) => {
    let displayStatus = 'On Time';
    if (status < 0) {
      displayStatus = 'Cancel';
    } else if (status > 0) {
      displayStatus = 'Delivered';
    }
    return{customerName, invoiceId, items:items.length, status: displayStatus, amount}
  })
  const actions = {
    edit: {
      label: 'Edit',
      onClick: () => {},
    },
    delete: {
      label: 'Delete',
      onClick: () => {},
    },
  }

  useEffect(()=>{
    axios.get('http://localhost:8002').then(function ({data}) {
      setInvoices(data.invoiceList);
    });
  }, []);


  return (
    <>
      <Table rows={displayData} actions={actions} hideFooter/>
    </>
  )
}