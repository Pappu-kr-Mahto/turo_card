import React, { useEffect, useState } from 'react';
import SkeletonCardSelf from './SkeletonCardSelf';
const SwapRequest = () => {
    const host ="https://turo-card-server.onrender.com"
    const [sendRequest, setsendRequest] = useState([]);
    const [receivedRequest, setreceivedRequest] = useState([]);

    const allSwapRequests = async () => {
        const response = await fetch(`${host}/api/allswaprequests/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        });
        const allRequests = await response.json();
        console.log(allRequests)
        setsendRequest(allRequests.send)
        setreceivedRequest(allRequests.receive)
    };
    useEffect(() => {
        allSwapRequests();
    }, []);

    const [swapcards, setswapcards] = useState([]);
    const handleViewClick = async (data) => {
        const response = await fetch(`${host}/api/swaprequest/cards/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "senderCard": data.senderCard,
                "receiverCard": data.receiverCard
            })
        });
        const cards = await response.json();
        setswapcards([cards.receiverCard[0], cards.senderCard[0]])
        console.log(cards)
        console.log(swapcards)
    }

    const cancelRequest = async (id) => {
        const response = await fetch(`${host}/api/cancelswaprequest/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({ "id": id })
        })
        const res = await response.json()
        console.log(res)
        alert(res)
        allSwapRequests();
    }

    const acceptSwapRequest = async (id) =>{
        const response = await fetch(`${host}/api/acceptswaprequest/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({ "id": id })
        })
        const res = await response.json()
        console.log(res)
        // alert(res)
        allSwapRequests();
    }
    
    return (
        <>
            <div className="container-fluid swap-request">
                <div className="row p-4">
                    <div className="col-md-6 col-sm-12" style={{ "borderRight": "2px solid black", "padding": "20px" }}>
                        <div className="sender">
                            <h2>Request Send</h2>
                            {
                                sendRequest.map((request) => {
                                    return (
                                        <div style={{ "padding": "10px", "border": "1px solid black", "borderRadius": "7px", "backgroundColor": "#e8eaee" }}>
                                            <div > <span style={{ "fontSize": "20px", "marginRight": "20px" }}>You send a swap  to request to <b>{request.receiverUser}</b></span>
                                            </div>
                                            <div style={{ "marginTop": "10px", "textAlign": 'center' }}>
                                                <button className='btn btn-sm btn-outline-success' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleViewClick(request)}>View</button>
                                                <button className='btn btn-sm btn-danger mx-3' onClick={() => cancelRequest(request.id)}>Cancel</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12  border-2" style={{ "padding": "20px" }}>
                        <div className="receiver">
                            <h2>
                                Request Received
                            </h2>
                            {
                                receivedRequest.map((request) => {
                                    return (
                                        <div style={{ "padding": "10px", "border": "1px solid black", "borderRadius": "7px", "backgroundColor": "#e8eaee" }}>
                                            <div > <span style={{ "fontSize": "20px", "marginRight": "20px" }}><b>{request.senderUser}</b> sends you a swap request</span>
                                            </div>
                                            <div style={{ "marginTop": "10px", "textAlign": 'center' }}>
                                                <button className='btn btn-sm btn-outline-success ' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleViewClick(request)}>View</button>
                                                <button className='btn btn-sm btn-primary mx-3' onClick={() => acceptSwapRequest(request.id)}>Accept</button>
                                                <button className='btn btn-sm btn-danger ' onClick={() => cancelRequest(request.id)}>Reject</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog modal-xl " >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Select a Card</h5>
                            <div id="selected_Card" style={{ "display": "none" }}></div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ overflowX: "scroll" }}>

                            <div className="container">
                                <div className="row justify-content-center">
                                    {
                                        swapcards.length > 1 ?
                                            <>
                                                <div className='col-4 py-3'>
                                                    <SkeletonCardSelf card={swapcards[0]} />
                                                </div>
                                                <div className="col-1 my-auto" style={{ "fontSize": "35px" }}>
                                                    <i className="fa-solid fa-right-left"></i>
                                                </div>
                                                <div className='col-4 py-3'>
                                                    <SkeletonCardSelf card={swapcards[1]} />
                                                </div>
                                            </>
                                            : <></>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SwapRequest;
