import React, { useState } from 'react'
import { Addproduct } from './Addproduct'

export const Productlist = () => {
  
    const[data, setData] = useState({
        valName: "",
        valPrice: "",
        valDescription: ""
    });
    const dataGiven =  (e) => {
        const {name, value} = e.target
        setData({...data, [name]:value})
    }
    const submitProduct = () => {
        const product = {
            name: data.valName,
            price: data.valPrice,
            description: data.valDescription
        }
        fetch("http://localhost:8080/product/set", {
            headers:{
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(product)
        }).then(response => {
            console.log("Data Received " + response)
        })

    }
    return (
        <div className='p-5 text-center '>
           <h1>Add a Product</h1>
           Name: <input type="text" className='mt-3' name="valName" value={data.valName} onChange={dataGiven} /> <br></br>
           Description : <input type="text" className='mt-3' name="valDescription" value={data.valDescription} onChange={dataGiven} /> <br></br>
           Price : <input type="text" className='mt-3' name="valPrice" value={data.valPrice} onChange={dataGiven} /> <br></br>
           <Addproduct />
           <input type="button" value="Add Product" onClick={()=>submitProduct()} />
        </div>
    );
}
