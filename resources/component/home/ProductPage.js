import "./oneproduct.css";
import { bookCoverData } from "../data/bookCoverData";
import { QuantityPicker } from "react-qty-picker";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddCart from "./addcart";

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

    const [itemCart, setItemCart] = useState(
        {
            book_id: "",
            qty: 1, //sl mac dinh
        }
          );

    console.log(itemCart);
    // const total_cart1 = props.total;   
    // function handleChange(value) {
    //     props.onChange(value);
    // }                    //state để cập nhật total cart header

    const total_cart = localStorage.getItem("total_cart");
    // console.log(total_cart);
    const handleClickCart = (id_book) => {
      
        const itemcart = "item"+id_book; //tao ten key cho sp 
        itemCart.book_id = id_book;

        const name = localStorage.getItem(itemcart);                            //tim key trong local
        const  cart =  localStorage.getItem("total_cart");
            if(name){ //ktra 
                console.log(JSON.parse(name).qty);                              //lay sl trong cart
                const total_qty_item = JSON.parse(name).qty + itemCart.qty;
                const  new_total_cart =  JSON.parse(cart) + itemCart.qty;        //cap nhat tong so luong all sp trong gio
                const qty_picker = itemCart.qty;
                itemCart.qty = total_qty_item;                                  //cap nhat sl sp bo vao gio
                
                localStorage.setItem(itemcart, JSON.stringify(itemCart));
                console.log(new_total_cart);
                localStorage.setItem("total_cart", new_total_cart);       //add sp vao gio
                itemCart.qty = qty_picker;                                      //reset qty trong state cart ve qty picker

            }else{

                console.log('San pham chua co tong gio');
                
                localStorage.setItem(itemcart, JSON.stringify(itemCart));
                const  new_total_cart = JSON.parse(cart) + itemCart.qty;        //cap nhat tong so luong all sp trong gio
                console.log(new_total_cart);
                localStorage.setItem("total_cart", new_total_cart);
            }
           console.log(itemCart);
        //    total_cart1.total_qty = new_total_cart;
        //    console.log(handleChange(total_cart1.total_qty));

     }
        

    
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
                            <div className="col-lg-4 left-side-product-box pb-3"  key={book3.id}>
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
                                {
                                book3.book_price === book3.final_price ? (<><strike>0</strike> <h3><b>${book3.final_price}</b></h3> </>)
                                 : (<><strike>{book3.book_price}</strike> <h3><b>${book3.final_price}</b></h3> </>) 
                                }
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
                                                <QuantityPicker min={data.min} max={8} value={data.min} id="qtyInput" 
                                                            onChange={(value)=>{   
                                                                itemCart.qty = value; console.log(itemCart); 
                                                                }}/>
                                            </div>
                                        ))} 
                                        
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div>
                            <button type="button" className="btn btn-secondary" onClick={() => handleClickCart(book3.id)}>Add to Cart</button>
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
