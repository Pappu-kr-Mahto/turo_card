import { React, useContext } from 'react';
import { Link, } from "react-router-dom";

import TurocardsContext from './context/turocards/turocardsContext';
import SkeletonCardSelf from './SkeletonCardSelf';
const MyCards = () => {

    const context = useContext(TurocardsContext)
    const { ownCards } = context;

    return (
        <>
            <div className="container mt-4">
                <div style={{ border: "1px solid black" }}>
                    <span style={{ fontSize: "36px", fontWeight: "700", marginLeft: "15px" }}>My Cards</span>
                    <Link to="/templates" className='btn btn-secondary ' style={{ float: "right" }}> <h3> Create New </h3>  </Link>
                </div>
                <div className='selftGlobalCard'>
                    {
                        ownCards.length === 0 ? <div className='m-3'>You hadn't created any Turo Card</div>
                            :
                            <div id="mycards" style={{ minHeight: "200px" }}>
                                <div className="row mx-5">
                                    {
                                        ownCards.length > 0 ?
                                            ownCards.map((card) => {
                                                return (
                                                    <div className="col-sm-12 col-md-6 col-lg-4 py-4" >
                                                        <SkeletonCardSelf key={card._id} card={card} />
                                                    </div>
                                                )
                                            })
                                            : <></>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

export default MyCards;
