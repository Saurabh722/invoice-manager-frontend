import { createProduct } from 'product/ProductApp';
import React, { useRef, useEffect } from 'react';

export default (props) => {
  const ref = useRef(null);

  useEffect(() => {
     createProduct(ref.current, props);
  }, [props]);

  return <div ref={ref} />;
};
