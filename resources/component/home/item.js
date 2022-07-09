import { bookCoverData } from "../data/bookCoverData";
import { QuantityPicker } from "react-qty-picker";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './cart.css';
export default function Item(props){

    const darta = [ { min: 1 },  ];

    const item1 = props.items;
    
    console.log(item1);

    const [onebook, setonebook] = useState([]);

    const url = 'http://localhost:8000/api/filtering?id=' + item1.book_id;

    console.log(onebook);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setonebook(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

return (

    <tr>
        {
            onebook.map((book_item) =>(
                // <>
                // <td>
                //     {book_item.book_cover_photo}
                // </td>
                // <td>
                //     {book_item.book_title} <br/> 
                //     {book_item.author_name}
                // </td>
                // <td>
                //     {book_item.final_price}
                // </td>
                // <td>
                //     {item1.qty}
                // </td>
                // <td>
                // <td>
                //     {
                //     Math.round(book_item.final_price*item1.qty * 100) / 100}
                // </td>
                // </td>
                <>
                           
                            <div class="p-2">
                            <th scope="row" class="border-0">
                                <img src={bookCoverData[book_item.book_cover_photo]} alt="books" width="100px" class="img-fluid rounded shadow-sm" />
                               </th>
                               <td>
                                <div class="ms-3 d-inline-block align-middle">
                                <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle"> {book_item.book_title}</a></h5>
                                <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle"> {book_item.author_name}</a></h5>
                                </div>
                                </td>
                            </div>
                           
                            <td class="border-0 align-middle"><strong>${book_item.final_price}</strong></td>
                            <td class="border-0 align-middle">                                
                            <div className='quantity'>
                                    {
                                    darta.map((data) => (
                                        <div className="App">
                                            <QuantityPicker id="qty-btn" min={data.max} value={item1.qty}/>
                                        </div>
                                        ))
                                    }
                            </div></td>
                            <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="bi bi-trash">{
                                Math.round(book_item.final_price*item1.qty * 100) / 100}</i></a></td>
                </>

                // </>
            ))
        }

    </tr>
);
}