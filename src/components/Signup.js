import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Link,
  } from "react-router-dom";

const Signup = () => {
    let navigate = useNavigate();
    
    const [Cred, setCred] = useState({username:"",email:"", password:"", cpassword:""});

    const onChange = (e) => {
        setCred({ ...Cred, [e.target.name]: e.target.value })
        console.log(Cred);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const host ="https://turo-card-server.onrender.com";
        const response = await fetch(`${host}/auth/createUser/`,{
            method :"POST",
            headers : {
                "Content-Type" :"application/json"
            },
            body : JSON.stringify({username:Cred.username,email:Cred.email,password:Cred.password})
        })

        const json = await response.json();
        console.log(json);

        if(json.success){
            // localStorage.setItem('token',json.authtoken);
            alert(json.success)
            navigate("/login");
        }
        else{
            alert("Invalid Credential");
        }

    }

    return (
        <div>
            <div className="container mt-5">
                <form className='col-md-6 m-auto p-4 border' style={{backgroundColor:"#cccbca" }} onSubmit={handleSubmit}>
                <div className="mb-3" style={{textAlign:"center"}}><h2>Sign Up</h2></div>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">UserName</label>
                        <input type="text" className="form-control" id="username" name='username'  value={Cred.username} onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={Cred.email}  onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"  value={Cred.password} onChange={onChange} name='password' required minLength={5}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" value={Cred.cpassword} onChange={onChange} required minLength={5}/>
                    </div>
                    <div className="mb-3" style={{"textAlign":"Center"}}> 
                        <button type="submit" className="btn btn-primary px-4" >Submit</button>
                    </div>
                    <hr />
                    <div style={{"textAlign":"Center"}}>
                       Already Have Account <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
