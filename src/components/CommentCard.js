import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TurocardsContext from './context/turocards/turocardsContext';
import { Link, } from "react-router-dom";
import CommentSingleMessage from './CommentSingleMessage';
const CommentCard = () => {
    const { id } = useParams();

    const context = useContext(TurocardsContext)
    const { likeStatus, addComment } = context;


    const initialState = []
    const [user, setuser] = useState("");
    const [likeUsers, setlike] = useState(initialState);
    const [likeCount, setlikeCount] = useState(0);
    const [comment, setcomment] = useState("");
    const [allComments, setallComments] = useState([]);
    // const [card, setcard] = useState([]);

    // const initialstate = [...cards,...ownCards]
    // let temp = initialstate.find((card)=>{
    //     return id === String(card.id)
    // })

    function parseStringToArrayOfObjects(stringData) {
        stringData = stringData.replaceAll('\'', '"')
        const res = [];
        let x = 0
        while (true) {
            let s = stringData.indexOf("{", x)
            let e = stringData.indexOf("}", x)
            if (s === -1) break;
            x = e + 1;
            let temp = stringData.substring(s, e + 1)
            temp = JSON.parse(temp)
            res.push(temp);
        }
        return res;
    }
    const host ="https://turo-card-server.onrender.com"
    const [card, setcard] = useState([]);
    useEffect(() => {
        const fetchAllCards = async () => {
            const response = await fetch(`${host}/api/turoCards/comment/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
            });
            const cards = await response.json();
            console.log(cards)
            setcard(cards.card[0]);
            setlike(cards.users)
            setuser(cards.user)
            setlikeCount(cards.card[0].likes_count)
            setallComments(parseStringToArrayOfObjects(cards.card[0].comments))

        };
        fetchAllCards();
    }, []);

    const ChangeLikeStatus = (id) => {
        console.log(`like_dislike${id}`);
        if (document.getElementById(`like_dislike${id}`).style.color === "white") {
            document.getElementById(`like_dislike${id}`).style.color = 'red';
            setlikeCount(likeCount + 1)
        }
        else {
            document.getElementById(`like_dislike${id}`).style.color = 'white';
            setlikeCount(likeCount - 1)
        }

        const obj = {
            "card_id": id,
        }
        likeStatus(obj)
    }


    const onChange = (e) => {
        setcomment(e.target.value)
        console.log(comment);
    };

    const handleComment = (e) => {
        e.preventDefault()
        console.log("Click")
        const obj = {
            "card_id": id,
            "comment": comment,
        }
        addComment(obj)
        // setallComments([comment,...allComments]);
        setcomment("")
        window.location.reload();
    }

    console.log(allComments)
    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center ">
                    <div className="col-3" >
                        <div id={`tcard${card.card_no}`} className={`card${card.card_no}`}>
                            <div className="uname">{card.username}</div>
                            <div className='title'>
                                <h2>{card.title}</h2>
                            </div>
                            <div className='image'>
                                <img className="card-img-top" src={`${host}/media/${card.image}`} alt="..." />
                            </div>

                            <div className='desc'>
                                {card.description}
                            </div>
                            <div className={`cardFooter${card.card_no}`}>
                                <span className='like' style={{ marginRight: "100px" }} onClick={(e) => ChangeLikeStatus(card.id)}>

                                    {
                                        likeUsers.includes(user) ?
                                            <>
                                                <span id={`like_dislike${card.id}`} style={{ color: "red" }}>
                                                    <i className="fa-solid fa-heart"></i>
                                                </span>
                                            </>
                                            :
                                            <span id={`like_dislike${card.id}`} style={{ color: "white" }}>
                                                <i className="fa-solid fa-heart"></i>
                                            </span>
                                    }

                                    <span style={{ marginLeft: "5px" }}> Like  ({likeCount})</span>
                                </span>
                                <span className='comment' style={{ color: "white", marginRight: "5px" }}> <i className="fa-solid fa-comment"></i>
                                    <span> <Link to={`/card/${card.id}/commnets`} style={{ textDecoration: "none", color: "white" }}>Comment</Link></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 " >
                        <h4>All Comments({allComments.length})</h4>
                        <div className='foot'>
                            <input name="comment"  value={comment} placeholder='Write a Comment' onChange={onChange}></input>
                            <button className='btn btn-primary btn-sm px-3' onClick={handleComment}><i className="fa-solid fa-paper-plane"></i> Post</button>
                        </div>
                        <div className='comment-box'>
                            {
                                allComments.map((obj) => {
                                    return (
                                        <>
                                            <div>
                                                <CommentSingleMessage key={comment._id} comment={obj} />
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;
