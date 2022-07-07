import "./oneproduct.css";
import { bookCoverData } from "../data/bookCoverData";
import { QuantityPicker } from "react-qty-picker";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProductPage()  {

    const [onebook, setonebook] = useState([]);

    let {id} = useParams();

    const url = 'http://localhost:8000/api/filtering?id=' + id;

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setonebook(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(onebook);
   
    const darta = [ { min: 1 },  ];
    
    return (

        <div className="container div-product"> 
        {
            onebook.map((book3) =>(
            <div class="row">
                <div class="column1">
                    <div className="col-lg-8 border p-3 main-section bg-white">
                            <div className="row hedding m-0 pl-3 pt-0 pb-3">
                                Category: <b>{book3.category_name}</b>
                            </div>
                        <div className="row m-0">
                            <div className="col-lg-4 left-side-product-box pb-3"  key={book3}>
                                <img src={bookCoverData[book3.book_cover_photo]} alt={book3.book_cover_photo} className="border p-3"></img>
                                <p>By (author): <b>{book3.author_name}</b></p>
                            </div>
                        <div className="col-lg-8">
                            <div className="right-side-pro-detail border p-3 m-0">
                                <div className="row">
                                    <div className="col-lg-12 pt-2">
                                        <h5><u>Title:</u> <b>{book3.book_title}</b></h5>
                                        <span><u>Summary:</u> <br/>{book3.book_summary}</span>
                                        <hr className="m-0 pt-2 mt-2"></hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="column2">
                    <div className="col-lg-8 border p-3 main-section1 bg-white">
                            <div className="row m-0 pl-3 pt-0 pb-3" >
                            <strike></strike> <h3><b>${book3.final_price}</b></h3>
                            </div>
                        <div className="row m-0">
                        <div className="quantitycart">
                            <div className="right-side-pro-detail border p-3 m-0">
                                <div className="row">
                                    <div className="col-lg-12 pt-2">
                                        <h5>Quanity</h5>
                                        <div>
                                            {darta.map((data) => (
                                        <div className="App">
                                            <QuantityPicker min={data.min} max={8} value={data.min} />
                                        </div>
                                        ))} 
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div>
                            <button type="button" className="btn btn-secondary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            ))
        }   
        </div>
        );

}
