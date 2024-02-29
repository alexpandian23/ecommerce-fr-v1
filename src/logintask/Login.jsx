import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
        console.log(name, value);
    }
    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(formData);
        const Check = {
            username: formData.username,
            password: formData.password
        }
        fetch("http://localhost:8080/form/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify(Check)
        })
         .then(response => {

                if (response.status === 200) {
                    console.log("datareceived", response);
                    alert("singup seccessfully");
                    navigate("/homels");
                }
            }).catch(error => {
                console.log("error", error);
            })
            .then((data) => {

                if (data == !formData.username && data == !formData.password) {
                    return alert("Enter valid details");
                } else {
                    console.log("Data", data)
                    setFormData(data)
                }
            })
            .catch((error) => {
                console.error("Error during fetch", error);
            });

    }
    return (
        <div className="css" >

            <div className="outer">
                <h1>Login Form</h1>
                <h4>login in to get notified</h4>
                <div>
                    <form onSubmit={handleSubmit}>

                        <p>Username : <input type="text" placeholder="Type your username" name="username" value={formData.username} onChange={handleChange} /></p>

                        <p>Password : <input type="password" placeholder="Type your Password" name="password" value={formData.password} onChange={handleChange} /></p>

                        <p>Create new account <Link to="/signup">Create</Link></p>

                        <input type="submit" value="Login" />
                    </form>
                </div>
            </div>
            {/* <div className="container">
                {Array.isArray(formData) && formData.map((formData) => (
                    <div className="card" key={formData.id}>
                        <h3>Welcome, {formData.firstname} {formData.lastname}</h3>
                    </div>
                ))}
            </div> */}
        </div>


    )
}