import React from 'react';
import Home from './component/home/HomePage';
import Header from './component/header/Header';
import Footer from './component/header/Footer';
import {Routes, Route} from 'react-router-dom'

function App() {
    
    return(
        <>
            <Header/>
            <Routes>
                <Route path='/home-page' element={<Home/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;