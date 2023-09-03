import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login, Signup} from "./Routes.js"
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
