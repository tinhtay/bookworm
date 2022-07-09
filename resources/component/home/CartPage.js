import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import QuanityPicker from 'react-qty-picker';
import axios from 'axios';
import { bookCoverData } from "../data/bookCoverData";
import Item from './item';
import './cart.css';

export default function CartPage(){
 
    var arr = [];
    const keys = Object.keys(localStorage);
    var i = keys.length;

    while ( i-- ) {
        if((localStorage.getItem(keys[i]) % 1) != 0){
            const item =  localStorage.getItem(keys[i]);
            arr.push(JSON.parse(item));
        }
    }
    
    const [items, setItems] = ([arr]);


    console.log(items);
    

    return (
        // <>
        <div className="container">
            <div class="row">
                <div className="cart">
                <div class="row">
                <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                    <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" class="border-0 bg-light">
                            <div class=" text-uppercase">Product</div>
                            </th>
                            
                            <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Price</div>
                            </th>
                            <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase"> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Quantity</div>
                            </th>
                            <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Total</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        items.map(item => (<Item items={item} />
                        ))
                    }
                        
                        </tbody>
                    </table>
                    </div>
                </div>   
                </div>


                </div>
                <div className="cart2">
                    <div class="row">
                    <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                        <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col" class="border-0 bg-light">
                                <h5>Cart Totals</h5> 
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row" class="border-0">
                                <div class="p-2">
                                    {localStorage.getItem("total_cart")} items
                                    <br></br>
                                    <div className='buttonfix'>
                                    <button className="btn btn-secondary">Order</button>
                                    </div>
                                    
                                </div>
                                </th>

                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>   
                    </div>


                </div>                         
            </div>
        </div>
        // </>
    );
}
