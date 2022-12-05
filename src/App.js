import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Index from './pages/index/Index';
import Clothes from './pages/clothes/Clothes';
import Tech from './pages/tech/Tech';
import ProductDetails from './pages/productDetails/ProductDetails';
import { Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='/clothes' element={<Clothes/>}></Route>
        <Route path='/tech' element={<Tech/>}></Route> 
        <Route path="/:id" element={<ProductDetails/>}></Route>  
      </Routes> 
    </div>
  );
}

export default App;
