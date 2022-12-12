import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Index from './pages/index/Index';
import Clothes from './pages/clothes/Clothes';
import Tech from './pages/tech/Tech';
import ProductDetails from './pages/product-details/ProductDetails';
import Bag from './pages/bag/Bag';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='/clothes' element={<Clothes/>}></Route>
        <Route path='/tech' element={<Tech/>}></Route> 
        <Route path="/products/:id" element={<ProductDetails/>}></Route>  
        <Route path="/bag" element={<Bag/>}></Route>
      </Routes> 
      <ToastContainer autoClose={1500} position="top-right"/>

    </div>
  );
}

export default App;
