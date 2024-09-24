import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import CreateProductModal from './components/widgets/createProduct/CreateProductModal';
import ProductList from './components/ProductList';

const generateClassName = createGenerateClassName({
  productionPrefix: 'po',
});

export default ({ history }) => {
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const onEdit = (pid) => {
    setSelected(productList.find(({productId}) => productId === pid))
    setOpen(true);
  }

  useEffect(()=>{
    axios.get('http://localhost:8000').then(function ({data}) {
      console.log('data', data);
      setProductList(data.productList);
    });
  }, []);
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <h1>Product</h1>
        <CreateProductModal type='drawer' open={open} setOpen={setOpen} onEdit={onEdit} selected={selected} setProductList={setProductList}/>
        <ProductList productList={productList} setProductList={setProductList} onEdit={onEdit} setSelected={setSelected}/>
      </StylesProvider>
    </div>
  );
};
