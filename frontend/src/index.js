import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { MainContextProvider } from './context/MainContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-b5mim3uz8qcc83gr.us.auth0.com"
    clientId="szJ5NmWn1pTC4rvEFeGoMh0I1c6gUTMe"
    authorizationParams={{
      redirect_uri: window.location.origin
      }}
    >
    <Provider store={store}>
      <MainContextProvider>
        <RouterProvider router={router} />
      </MainContextProvider>
    </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
reportWebVitals();
