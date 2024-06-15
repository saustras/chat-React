import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/global.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux";
import { store } from './redux/store.js'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
