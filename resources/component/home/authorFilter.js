import React, { useState, useEffect } from "react";

import axios from 'axios';

export default function Author(){

    const [author, setAuthor] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/allauthor')
            .then((res) => {
                setAuthor(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

      console.log(author);

      return (
        <>
           {
            author.map( (aut) => (
                <tr><td>
                <a onClick={() => handleClickFilter(aut.author_id)} href="#">{aut.author_name}</a>
                </td></tr>
               )) 
           }
        </>
      );
}