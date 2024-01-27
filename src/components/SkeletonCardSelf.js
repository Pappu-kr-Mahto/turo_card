import React, { useContext, useEffect, useState } from 'react';
import TurocardsContext from './context/turocards/turocardsContext';
import { Link } from "react-router-dom";

const SkeletonCardSelf = (props) => {
    const context = useContext(TurocardsContext)
    const { likeStatus, username } = context;
    const { card } = props;
    // console.log(user)
    const initialState = []
    const [likeUsers, setlike] = useState(initialState);
    const [likeCount, setlikeCount] = useState(card.likes_count);
    console.log(likeUsers,username)

    useEffect(() => {
        return () => {
            setlike((card.likes.replace(/'/g, '"')))
        };
    });

    const ChangeLikeStatus = (id) => {
        // console.log(`like_dislike${id}`);
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
        // location.reload();
    }

    return (
        <>
            <div id={`tcard${card.id}`} className={`card${card.card_no}`}>
                <div className="uname">{card.username}
                    {/* <span style={{ float: "right", marginRight: "15px" }}>
                        <span type="button" data-bs-toggle="tooltip" data-bs-html="true" title="Send a Swap Request">
                            <i class="fa-solid fa-arrow-right-arrow-left"  ></i>
                        </span>
                    </span> */}
                </div>
                <div className='title'>
                    <h2>{card.title}</h2>
                </div>
                <div className='image'>
                    <img className="card-img-top" src={` http://localhost:8000/media/${card.image}`} alt="..." />
                </div>

                <div className='desc'>
                    {card.description}
                </div>
                <div className={`cardFooter${card.card_no}`}>
                    <span className='like' style={{ marginRight: "100px" }} onClick={(e) => ChangeLikeStatus(card.id)}>

                        {
                            likeUsers.includes(username) ?
                                <>
                                    <span id={`like_dislike${card.id}`} style={{ color: "red" }}>
                                        <i class="fa-solid fa-heart"></i>
                                    </span>
                                </>
                                :
                                <span id={`like_dislike${card.id}`} style={{ color: "white" }}>
                                    <i class="fa-solid fa-heart"></i>
                                </span>
                        }

                        <span style={{ marginLeft: "5px" }}> Like  ({likeCount})</span>
                    </span>
                    <span className='comment' style={{ color: "white", marginRight: "5px" }}> <i class="fa-solid fa-comment"></i>
                        <span> <Link to={`/card/${card.id}/commnets`} style={{ textDecoration: "none", color: "white" }}>Comment</Link></span>
                    </span>
                </div>
            </div>

        </>
    );
}

export default SkeletonCardSelf;
