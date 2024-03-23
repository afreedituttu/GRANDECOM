import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login, Signup, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage} from "./Routes.js"
import './App.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store.js';
import { loadUser } from './redux/actions/user.js';
import { useSelector } from 'react-redux/es/hooks/useSelector.js';

const App = () => {
  const { loading} = useSelector((state)=>state.user);
  useEffect(()=>{
    Store.dispatch(loadUser())
  }, [])
  return (
    <>
    {loading ? null : 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FAQPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>}
    </>
  )
}

export default App