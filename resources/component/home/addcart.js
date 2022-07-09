import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function AddCart(props){
    const itemcart = props.itemcart;
    
    useEffect(() => {
        localStorage.setItem('itemCart2', JSON.stringify(itemcart));
        }, [itemcart]);
}