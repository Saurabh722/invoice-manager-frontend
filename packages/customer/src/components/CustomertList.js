import * as React from 'react';
import axios from 'axios';
import Table from './UI/Table';

const heads =  ['customer Id', 'Name', 'Category', 'Price', 'Quantity', 'Actions'];

const CustomerList = ({customerList, setCustomerList, onEdit}) => {
  console.log('customerList - ', customerList);

  const onDelete = (customerId) => {
    console.log(customerId);
    axios.delete(`http://localhost:8001/customer/${customerId}`, {customerId: customerId}).then(function ({data}) {
      console.log(data);
      setCustomerList(data);
    });
  }

  const actions = {
    edit: {
      label: 'Edit',
      onClick: onEdit,
    },
    delete: {
      label: 'Delete',
      onClick: onDelete,
    },
  }

 return <Table heads={heads} rows={customerList} actions={actions}/>
}
 
export default CustomerList;
