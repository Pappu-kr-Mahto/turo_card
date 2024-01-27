import React, { useContext, useEffect, useState } from 'react';
import TurocardsContext from './context/turocards/turocardsContext';
import { Link } from "react-router-dom";
import SkeletonCardSelf from './SkeletonCardSelf';
const SkeletonCard = (props) => {
    const context = useContext(TurocardsContext)
    const { ownCards, likeStatus, username ,SwapRequest} = context;
    const { card } = props;
    const initialState = []
    const [likeUsers, setlike] = useState(initialState);
    const [likeCount, setlikeCount] = useState(card.likes_count);
    // console.log(likeUsers, username)

    useEffect(() => {
        return () => {
            setlike((card.likes.replace(/'/g, '"')))
        };
    });

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
        // location.reload();
    }
    
    const [swapReceiverCard, setswapReceiverCard ]= useState(0);
    const modalHandleClick = (card_id) => {
        console.log(card_id);
        setswapReceiverCard(card_id);
        document.getElementById("selected_Card").innerText=card_id;
    }
    const [swapselectedCard, setswapselectedCard] = useState(0);
    const modalSelectedCard = (e,id) =>{
        setswapselectedCard(id)
        const a =document.getElementById(`tcard${id}`).parentElement;
        const allDivs = document.querySelectorAll('.modal-card');
        allDivs.forEach(div => {
            div.firstChild.classList.remove('select_card');
          });

        a.firstChild.classList.add('select_card');
        
    }
    const handleSwapRequest = ()=>{
        const obj={
            "receiver":document.getElementById("selected_Card").innerText,
            "sender":swapselectedCard,
        }
        const res=SwapRequest(obj)
        console.log(res)
    }
    return (
        <>
            <div id={`tcard${card.id}`} className={`card${card.card_no}`}>
                <div className="uname">{card.username}
                    <span style={{ float: "right", marginRight: "15px" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => modalHandleClick(card.id)} >
                        <span type="button" data-bs-toggle="tooltip" data-bs-html="true" title="Send a Swap Request" >
                            <i class="fa-solid fa-arrow-right-arrow-left"  ></i>
                        </span>
                    </span>
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


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"                                                                  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div class="modal-dialog modal-xl modal-dialog-scrollable" >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Select a Card</h5>
                            <div id="selected_Card" style={{"display":"none"}}></div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{ overflowX: "scroll" }}>

                            {
                                ownCards.length === 0 ? <div className='m-3'>You hadn't created any Turo Card</div>
                                    :
                                    <div id="mycards" style={{ minHeight: "200px" }}>
                                        <div className="row m-auto">
                                            {
                                                ownCards.length > 0 ?
                                                    ownCards.map((card) => {
                                                        return (
                                                            <div className="col-4 py-3 modal-card" onClick={(e)=> modalSelectedCard(e,card.id)}>
                                                                <SkeletonCardSelf key={card._id} card={card} />
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <>
                                                    <h3> Didn't have any card to select. </h3>
                                                    </>
                                            }
                                        </div>
                                    </div>
                            }

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handleSwapRequest} >Send Request</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SkeletonCard;
