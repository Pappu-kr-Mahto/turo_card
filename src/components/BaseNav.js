import React from 'react';
import {
    Link,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const BaseNav = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem('token')
        navigate("/");
    }

    return (
        <div>
            {
                !localStorage.getItem("token") ?
                    <>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="">Turo Card
                                </Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" onClick={handleClick} to="/">Home</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                                <Link className='btn btn-outline-secondary' to="/login">SignIn</Link>
                                <Link className='btn bth-success btn-outline-success mx-3' to="/signup">SignUp</Link>
                        </nav>

                    </>
                    :
                    <>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="/index">Turo Card
                                </Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item mx-2">
                                            <Link className="nav-link active" aria-current="page" to="/index">Home</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link className="nav-link active" aria-current="page" to="/mycards">My Cards</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link className="nav-link active" aria-current="page" to="/templates">Create Card</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <Link className="nav-link active" aria-current="page" to="/swaprequests">SWAP Requests</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <Link className='btn btn-sm bth-success btn-outline-warning mx-3' to="/signup" onClick={handleClick}>Logout</Link>
                        </nav>

                    </>
            }


        </div>
    );
}

export default BaseNav;
