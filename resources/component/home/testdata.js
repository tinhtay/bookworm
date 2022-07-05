import React from "react";
import axios from 'axios';

export default class DataTest extends React.Component{
    state = {
        books: []
      }
   

       componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/topdiscount')
          .then(res => {
            const books = res.data;
            this.setState({ books });
          })
          .catch(error => console.log(error));
      }
    
      render() {
        return (
          <ul>
            { this.state.books.map(books => <li>{books.id}</li>)}
          </ul>
        )
      }
}

