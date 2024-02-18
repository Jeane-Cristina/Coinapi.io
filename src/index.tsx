import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Layout from './components/layout/Layout';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Home from './components/pages/Home';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {

    element: <Layout/>,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
