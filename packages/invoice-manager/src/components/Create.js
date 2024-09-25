import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProduct from '../widgets/CreateProduct';
import Table from './Table';

const DOMAIN = 'http://localhost:8000';

const getHeads = (row) => {
  const keys = Object.keys(row);
  return keys.map(key => key.charAt(0).toUpperCase() + key.slice(1));
}

export default function InvoiceApp({type}) {
  const [productList, setProductList] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const selectedProduct = productList.filter(product => selectedProductIds.includes(product.productId));

  const tableHeads = productList.length && getHeads(productList[0]);

  const getProductById = (pid) => {
    return productList.find(({productId}) => pid === productId)
  }

  const onEdit = (productId) => {
    console.log(productId);
    axios.put(`${DOMAIN}product/${productId}`, {productId: productId}).then(function ({data}) {
      console.log(data);
      setProductList(data);
    });
  }

  const onDelete = (productId) => {
    console.log(productId);
    axios.delete(`${DOMAIN}/product/${productId}`, {productId: productId}).then(function ({data}) {
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

  useEffect(()=>{
    console.log('useEffect productList', productList)
    axios.get('http://localhost:8000').then(function ({data}) {
      setProductList(data.productList);
    });
  }, []);

  const createProductProps = {
    productList,
    setProductList,
    selectedProducts: selectedProductIds,
    setSelectedProducts: setSelectedProductIds,
  }

  return (
    <>
      <h1>Invoice App</h1>
      <CreateProduct {...createProductProps}/>
      <Table heads={tableHeads} rows={selectedProduct} actions={actions} createProductProps={createProductProps}/>
    </>
  )
}