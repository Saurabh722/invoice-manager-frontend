import { createCustomer } from 'customer/CustomerApp';
import React, { useRef, useEffect } from 'react';

export default (props) => {
  const ref = useRef(null);

  useEffect(() => {
    createCustomer(ref.current, props);
  }, [props]);

  return <div ref={ref} />;
};
