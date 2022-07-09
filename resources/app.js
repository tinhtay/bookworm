
import React, {useState} from 'react';
import Home from './component/home/HomePage';
import DataTest from './component/home/testdata';
import Header from './component/header/Header';
import Footer from './component/header/Footer';
import About from './component/home/about';
import ShopPage from './component/home/ShopPage';
import ProductPage from './component/home/ProductPage';
import CartPage from './component/home/CartPage';

import {Routes, Route} from 'react-router-dom';

function App() {
    // const [total, setTotal] = useState(
    //     {
    //         "total_qty": localStorage.getItem("total_cart"),
    //     }
    // );
    // function handleChange(newValue) {
    //     setTotal(newValue);
    //   }
    // console.log(total); total={total} onChange={handleChange}
    return(
        <>
            <Header />
            <Routes>
                <Route path='/home-page' element={<Home/>}/>
                <Route path="/about-us" element={<About />}></Route>
                <Route path="/shop-page" element={<ShopPage/>}></Route>
                <Route path="/product-page/:id" element={<ProductPage />}></Route>
                <Route path="/cart-page" element={<CartPage/>}></Route>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;