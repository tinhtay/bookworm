import "./homepage.css";
import { bookCoverData } from "../data/bookCoverData";
import React from "react";

import axios from 'axios';

class ShopPage extends React.Component {
    
    constructor(props){
        super(props);
    
        this.state = {
            allbook:[],
        
        };
    }
    async componentDidMount(){
        await axios.get('http://127.0.0.1:8000/api/allbook').then(result =>{
            const allbook = result.data.data;
            this.setState({allbook:allbook});
           
        })
        
    }
    
    // async componentDidMount(){
    //     axios.get('http://127.0.0.1:8000/api/allbook')
    //     .then(result => {console.log(result.data);})
    //     }
    render() {
        return (
            <section> 
                <div className="container">
                    <div className="row">
                            <div className="col-md-12 title-shop-page">
                                <p> <b>Books</b> (filter by category #1)</p>
                                <hr/> 
                            </div>
                    </div>
                    
                    <div className="row shop-page-list">
                        <div className="col-md-2">
                            <div className="row">
                                <div className="col-md-12">
                                    <b>Filter By</b>
                                </div>
                                <div className="col-md-12">
                                    <table className="table">
                                        <thead><th>Category</th></thead>
                                        <tbody>
                                            <tr><td>Caterogy name</td></tr>
                                            <tr><td>Caterogy #2</td></tr>
                                            <tr><td>Caterogy #3</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12">
                                    <table className="table">
                                        <thead><th>Author</th></thead>
                                        <tbody>
                                            <tr><td>Author name</td></tr>
                                            <tr><td>Author #2</td></tr>
                                            <tr><td>Author #3</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12">
                                    <table className="table">
                                        <thead><th>rating Review</th></thead>
                                        <tbody>
                                            <tr><td>1 Star</td></tr>
                                            <tr><td>2 Star</td></tr>
                                            <tr><td>3 Star</td></tr>
                                            <tr><td>4 Star</td></tr>
                                            <tr><td>5 Star</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-3">
                                    showing 1-12 of 126 books
                                </div>
                                <div className="col-md-9">
                                   <div className="row">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div class="btn-group btn-sort">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                           Sort By 
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                                            <li><a class="dropdown-item" href="#" >Sort By Sale</a></li>
                                            <li><a class="dropdown-item" href="#">Sort By Review</a></li>
                                            <li><a class="dropdown-item" href="#">Sort By Price: low to high</a></li>
                                            <li><a class="dropdown-item" href="#">Sort By Price: high to low</a></li>
                                        </ul>
                                    </div>
                                    <div class="btn-group btn-sort">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                        Show number book
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                                        <li><a class="dropdown-item" href="/shop-page?how=10">10</a></li>
                                        <li><a class="dropdown-item" href="/shop-page?how=20">20</a></li>
                                        <li><a class="dropdown-item" href="/shop-page?how=30">30</a></li>
                                    </ul>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                                <div className="col-md-12"> hello
                                <div className="row">
                                {
                                        this.state.allbook.map(book1 => {
                                        return (
                                        <div className="col-lg-3 col-md-4 col-sm-4 mb-4" key={book1}>
                                            <div >
                                                <img  src={bookCoverData[book1.book_cover_photo]} alt={book1.book_cover_photo} />
                                                <div >
                                                    <p className="book-title font-18px ">{book1.book_title}</p>
                                                    <p className="book-author font-10px"><i>{book1.author_name}</i></p>
                                                </div>
                                                <div ><strike></strike> <b>${book1.final_price}</b></div>
                                            </div>
                                        </div>
                                        )
                                        })
                                    }
                                     
                                </div>
                                     
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default ShopPage;  