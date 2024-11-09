import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoute from './routes/AppRoute';
import './App.css';
import { Provider} from 'react-redux';
import {store} from './All Components/redux/store';
import { PrimeReactProvider } from 'primereact/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
          <AppRoute />
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
