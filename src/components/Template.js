import React from 'react';
import turu_card from "./Images/turu_logo.png"
import {
    Link,
} from "react-router-dom";

const Template = () => {
    return (
        <>
            <div className="container">
                <div className='mt-3'>
                    <h2>All templates Here</h2>
                </div>
                <div className="row">

                    <div className='col-4 mt-3 mx-3  '>
                        <div id='tcard1' className="card1">
                            <div className='uname'>usename</div>
                            <div className='title'>
                                <h2>Title of Card</h2>
                            </div>
                            <div className='image'> <img src={turu_card} className="card-img-top" alt="..." /></div>

                            <div className='desc'>
                                Lorem ipsum, dolor sit amet consectetur  elit. Quisquam sunt asperiores ex doloremque impedit voluptatibus laudantium libero officia nobis esse?
                            </div>
                            <div className='d-grid Button'>
                                <Link className='btn btn-dark btn-lg' to="/templates/card1">Create Card</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 mt-3 mx-3  '>
                        <div id='tcard2' className="card2">
                            <div className='uname'>usename</div>
                            <div className='image'> <img src={turu_card} className="card-img-top" alt="..." /></div>
                            <div className='title'>
                                <h2>Title of Card</h2>
                            </div>

                            <div className='desc'>
                                Lorem ipsum, dolor sit amet consectetur  elit. Quisquam sunt asperiores ex doloremque impedit voluptatibus laudantium libero officia nobis esse?
                            </div>
                            <div className='d-grid Button'>
                            <Link className='btn btn-dark btn-lg' to="/templates/card2">Create Card</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 mt-3 mx-3 '>
                        <div id='tcard3' className="card3">
                            <div className='uname'>usename</div>
                            <div className='title'>
                                <h2>Title of Card</h2>
                            </div>
                            <div className='image'> <img src={turu_card} className="card-img-top" alt="..." /></div>
                            <div className='desc'>
                                <p>Lorem ipsum, dolor sit amet consectetur  elit. Quisquam sunt asperiores ex doloremque impedit voluptatibus laudantium libero officia nobis esse?
                                </p>
                            </div>
                            <div className='d-grid Button'>
                            <Link className='btn btn-dark btn-lg' to="/templates/card3">Create Card</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Template;
