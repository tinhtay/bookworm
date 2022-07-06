import "./oneproduct.css";
import { bookCoverData } from "../data/bookCoverData";
import { QuantityPicker } from "react-qty-picker";
import React, {useParams} from "react";
import axios from 'axios';

class ProductPage extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            onebook:[],
        
        };
    }
    async componentDidMount(){
        // let { slug } = useParams();
        // await axios.get('http://127.0.0.1:8000/api/filtering?id=1').then(result =>{
        //     const onebook = result.data.data;
        //     this.setState({onebook:onebook});
           
        // })
        await axios.get('http://127.0.0.1:8000/api/filtering?id=1').then(respone=>{
            this.setState({onebook:respone.data}); })
       
    //    await axios({
    //         method: 'get',
    //         params: {
    //             "id" : this.props.match.params.id,
    //             "category_id" : null,
    //             "author_id" : null,
    //             "rate_star": null
    //         },
    //         url: 'http://127.0.0.1:8000/api/filtering',
    //         responseType: 'json',
    //     }).then( response => {this.setState({onebook:response.data});})
    }
    
    // async componentDidMount(){
    //     axios.get('http://127.0.0.1:8000/api/filtering?id=1')
    //     .then(result => {console.log(result.data);})
    //     }

        render(){
            const darta = [
                { min: 1 },
              ];
    
        return (
    
            <div className="container div-product">
                 {
                        this.state.onebook.map(book3 =>{
                            return (
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
                            )
                        })
                    }
               
                </div>
          );
    }
}
export default ProductPage;