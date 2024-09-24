import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Progress from './components/Progress';
import Header from './components/Header';

import InvoiceApp from './components/InvoiceApp';
import CreateInvoice from './components/CreateInvoice';

const CustomerLazy = lazy(() => import('./components/CustomerApp'));
const ProductLazy = lazy(() => import('./components/ProductApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />      
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/customer" component={CustomerLazy} />
              <Route path="/product" component={ProductLazy} />
              <Route path="/invoice" component={CreateInvoice} />
              <Route path="/invoice/:invoiceId" component={CreateInvoice} />
              <Route exact path="/" component={InvoiceApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
