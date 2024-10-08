import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
import SelectCustomer from './components/widgets/selectCustomer/SelectCustomer';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// Mount function to start up the app
const createCustomer = (el, props) => {
  ReactDOM.render(<SelectCustomer {...props}/>, el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_customer-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount, createCustomer };
