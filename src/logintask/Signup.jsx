import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';


export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  }

  const Signup1 = (event) => {
    const data = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    }
    event.preventDefault();
    // Signup1();
    console.log(formData);
    if(!data.username || !data.email || !data.password){
      alert("please fill in all fields")
    }
    
    fetch("http://localhost:8080/form/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body:JSON.stringify(data)
    })
    .then((response)=>{

      if(response.status===200){
      console.log("datareceived",response);
      alert("signup seccessfully");
      navigate("/login");
      }
    }).catch(error=>{
      console.log("error",error);
    })
  }

  return (
    <div>

      <form onSubmit={Signup1}>
        <h1>Signup Form</h1>
        <label htmlFor="">username</label>
        <input type="text" name='name' value={formData.name} onChange={handleChange} />
        <br /><br />

        <label htmlFor="">emailId</label>
        <input type="text" name='email' value={formData.email} onChange={handleChange} />
        <br /><br />

        <label htmlFor="">password</label>
        <input type="password" name='password' value={formData.password} onChange={handleChange} />
        <br /><br />

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}