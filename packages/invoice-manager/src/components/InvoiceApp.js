import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';

export default function InvoiceApp() {
  const [invoices, setInvoices] = useState([]);

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