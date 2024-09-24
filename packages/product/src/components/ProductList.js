import * as React from 'react';
import axios from 'axios';
import Table from './UI/Table';

const heads =  ['Product Id', 'Name', 'Category', 'Price', 'Quantity', 'Actions'];

const ProductList = ({productList, setProductList, onEdit}) => {
  console.log('productList - ', productList);

  const updateProduct = (productId) => {
    console.log(productId);
    axios.put(`http://localhost:8000/product/${productId}`, {productId: productId}).then(function ({data}) {
      console.log(data);
      setProductList(data);
    });
  }

  const onDelete = (productId) => {
    console.log(productId);
    axios.delete(`http://localhost:8000/product/${productId}`, {productId: productId}).then(function ({data}) {
      console.log(data);
      setProductList(data);
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

 return <Table heads={heads} rows={productList} actions={actions}/>
}
 
export default ProductList;
