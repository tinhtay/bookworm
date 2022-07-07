import React, { useState, useEffect } from "react";

import axios from 'axios';

export default function Category(){

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/allcategory')
            .then((res) => {
                setCategory(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

      console.log(category);

      return (
        <>
           {
            category.map( (cat) => (
                <tr><td>{cat.category_name}</td></tr>
               )) 
           }
        </>
      );
}