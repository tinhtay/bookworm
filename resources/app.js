import React from 'react';
import Home from './component/home/HomePage';
import DataTest from './component/home/testdata';
import Header from './component/header/Header';
import Footer from './component/header/Footer';
import About from './component/home/about';
import ShopPage from './component/home/ShopPage';
import ProductPage from './component/home/ProductPage';
import {Routes, Route} from 'react-router-dom';

function App() {
    
    return(
        <>
            <Header/>
            <Routes>
                <Route path='/home-page' element={<Home/>}/>
                <Route path="/about-us" element={<About />}></Route>
                <Route path="/shop-page" element={<ShopPage/>}></Route>
                <Route path="/product-page" element={<ProductPage/>}></Route>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;