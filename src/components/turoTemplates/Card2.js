import React, { useState, useContext, useEffect } from 'react';
import TurocardsContext from '../context/turocards/turocardsContext';
import turu_card from "../Images/turu_logo.png"
import { useNavigate } from 'react-router-dom';
import { Link, } from "react-router-dom";

const Card2 = () => {
    const navigate = useNavigate();

    const [card, setCard] = useState({ cardTitle: "", cardDescription: "" ,status:"public"});
    const onChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
        console.log(card)
    }

    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');


    useEffect(() => {
        return () => {

            setImage(turu_card)
        };
    }, []);

    const getImage = (e) => {
        if (e.target.files.length !== 0) {
            setImageFile(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
            console.log(image)
            console.log(imageFile)
        }
    }

    const context = useContext(TurocardsContext)
    const { username,createTuroCard } = context;
    const handleClick =(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("username",username);
        formData.append("title", card.cardTitle);
        formData.append("description", card.cardDescription);
        formData.append("status",card.status)
        formData.append("card_no", 2);
        formData.append("image", imageFile);
        createTuroCard(formData)
        
        alert("Card Created successfully.")
        navigate("/index")

    }
    return (
        <>
            <div className="container mt-5" >
                <div className="row "   >
                    <div className=" col-6 m-auto"  >
                        <form style={{ border: "1px solid black", padding: "20px" }} onSubmit={handleClick}>
                            <h1 className='mb-3'>Turo Card</h1>
                            <div className="row" >
                                <div className='col-6'>
                                    <div className="mb-3">
                                        <label htmlFor="cardTitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="cardTitle" name='cardTitle' value={card.cardTitle} onChange={onChange} maxLength={40} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cardDescription" className="form-label">Description</label>
                                        <textarea type="textarea" value={card.cardDescription} onChange={onChange} name='cardDescription' className="form-control" id="cardDescription" maxLength={250} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cardImage" className="form-label">Upload image</label>
                                        <input type="file" onChange={getImage} name="cardImage" className="form-control" id="cardImage" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Card Visibility</label>
                                        <select name="status" value={card.status}  onChange={onChange}  style={{marginLeft:"10px"}}>
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div id='tcard2' className="card2">
                                        <div className='uname'>usename</div>
                                        <div className='title'>
                                            <h2>{card.cardTitle}</h2>
                                        </div>
                                        <div className='image'> <img src={image} className="card-img-top" alt="..." /></div>

                                        <div className='desc'>
                                            {card.cardDescription}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 Button'>
                                <Link to="/templates" className='btn btn-outline-danger btn-lg mx-1' style={{ width: "49%" }}>Close</Link>
                                <button type='submit' className='btn btn-outline-success btn-lg' style={{ width: "49%" }}  >Generate</button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </>
    );
}

export default Card2;
