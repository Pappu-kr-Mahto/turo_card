import React, {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Link,
  } from "react-router-dom";


const Login = () => {
    
    let navigate = useNavigate();
    
    const [cred, setcred] = useState({ email:"", password:"" });

    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
        console.log(cred);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host ="https://turo-card-server.onrender.com"
        const response = await fetch(`${host}/auth/loginUser/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cred)
        });
        const json = await response.json();
        console.log(json)

        if(json.success){
            console.log(json)
            localStorage.setItem('token',json.access);
            navigate("/index")
        }
        else{
            
            alert("Invalid Credentials");
        }


    }
    return (
        <>

            <div className="container mt-5 p-4 ">
                <form className='col-md-6 m-auto p-4 border' style={{backgroundColor:"#cccbca" }} onSubmit={handleSubmit}>
                    <div className="mb-3" style={{textAlign:"center"}}><h2>Sign In</h2></div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            name="email"
                            value={cred.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Passowrd
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={cred.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3" style={{"textAlign":"Center"}}><button type="submit" className="btn btn-primary px-4">Log In</button></div>
                    <hr />
                    <div style={{"textAlign":"Center"}}>
                        Don't Have Account <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
