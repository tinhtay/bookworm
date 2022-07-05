import "./homepage.css";
import { Button } from 'reactstrap';
import { bookCoverData } from "../data/bookCoverData";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import axios from 'axios';

class Home extends React.Component {
   
    state = {
        books:[],
        bookrecommend:[],
        bookpopular:[]

    }
    async componentDidMount(){
       const rq1 =  await axios.get('http://127.0.0.1:8000/api/topdiscount').then(respone=>{
            this.setState({books:respone.data});
        })
        const rq2 = await axios.get('http://127.0.0.1:8000/api/toprecommend').then(respone=>{
            this.setState({bookrecommend:respone.data});
        })
        const rq3 = await axios.get('http://127.0.0.1:8000/api/toppopular').then(respone=>{
            this.setState({bookpopular:respone.data});
        })
        await Promise.all([rq1,rq2,rq3]);
        
    }
    
   
     
    render() {
        return (
        <section className="home-page">
            <div className="container">
                <div className="row align-items-center mb-4">
                    <div className="col-lg-6">
                        <p>On Sale</p>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                        <Button color="secondary" size="sm">
                            View All &nbsp; <i class="fas fa-angle-right"></i> 
                        </Button>
                    </div>
                </div>
                <Swiper 
                    spaceBetween={50} 
                    slidesPerView={4} 
                    navigation={true} 
                    loop={true}
                    loopFillGroupWithBlank={true}
                    modules={[Autoplay, Navigation]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {
                    this.state.books.map(book => {
                        
                    return (
                        <SwiperSlide key={book.book_cover_photo} className="carousel">
                            <div className="card">
                                <img className="card-img-top img-fluid" src={bookCoverData[book.book_cover_photo]}
                                 alt={book.book_cover_photo} />
                                <div className="card-body">
                                    <p className="book-title font-18px">{book.book_title}</p>
                                    <p className="book-author font-10px"><i>{book.author_name}</i></p>
                                </div>
                                <div className="card-footer text-muted font-14px"><strike>{book.book_price}</strike> <b>${book.sub_price}</b></div>
                            </div>
                        </SwiperSlide>)})
                    }
                </Swiper>
                <div className="book-list">
                    <div className="text-center">
                        <p className="section-title font-20px mb-3">Featured Books</p>
                        <div className="mb-4">
                            {/* <Button color="secondary">
                                Recommended
                            </Button>
                            <a className="custom-link">Popular</a> */}
                            <p>
                            <a className="btn btn-secondary btn-recommend" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                            Recommend 
                            </a> |
                            <a className="btn btn-default btn-ppl" data-bs-toggle="collapse" href="#collapseExample2" role="button"  aria-expanded="false" aria-controls="collapseExample2">
                            Popular
                            </a>
                            </p>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="collapse" id="collapseExample">
                                    <div className="card card-body">
                                        <div className="text-center">
                                            <div className="mb-4">
                                                    All books recommend
                                            </div>
                                        </div>
                                        <div id="mainRow" className="row">
                                            {
                                            this.state.bookrecommend.map(book1 => {
                                            return (
                                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={book1}>
                                                <div className="card">
                                                    <img className="card-img-top img-fluid" src={bookCoverData[book1.book_cover_photo]} alt={book1.book_cover_photo} />
                                                    <div className="card-body">
                                                        <p className="book-title font-18px ">{book1.book_title}</p>
                                                        <p className="book-author font-10px"><i>{book1.author_name}</i></p>
                                                    </div>
                                                    <div className="card-footer text-muted font-14px"><strike></strike> <b>${book1.final_price}</b></div>
                                                </div>
                                            </div>
                                            )
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse" id="collapseExample2">
                                    <div className="card card-body">
                                        <div className="text-center">
                                            <div className="mb-4">
                                              All books most popular
                                            </div>
                                        </div>
                                        <div id="mainRow" className="row">
                                            {
                                            this.state.bookpopular.map(book2 => {
                                            return (
                                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={book2}>
                                                <div className="card">
                                                    <img className="card-img-top img-fluid" src={bookCoverData[book2.book_cover_photo]} alt={book2.book_cover_photo} />
                                                    <div className="card-body">
                                                        <p className="book-title font-18px ">{book2.book_title}</p>
                                                        <p className="book-author font-10px"><i>{book2.author_name}</i></p>
                                                    </div>
                                                    <div className="card-footer text-muted font-14px"><strike></strike> <b>${book2.final_price}</b></div>
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
                   
                    {/* <div id="mainRow" className="row">
                        {
                        this.state.bookrecommend.map(book1 => {
                        return (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={book1}>
                            <div className="card">
                                <img className="card-img-top img-fluid" src={bookCoverData[book1.book_cover_photo]} alt={book1.book_cover_photo} />
                                <div className="card-body">
                                    <p className="book-title font-18px ">{book1.book_title}</p>
                                    <p className="book-author font-10px"><i>{book1.author_name}</i></p>
                                </div>
                                <div className="card-footer text-muted font-14px"><strike></strike> <b>{book1.final_price}</b></div>
                            </div>
                        </div>
                        )
                        })
                        }
                    </div> */}
                    
                </div>
            </div>
        </section>
        );
    }
}

export default Home;  