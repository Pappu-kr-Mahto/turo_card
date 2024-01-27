// import { useState } from "react";
import { React, useEffect, useContext } from 'react';
// import {  Link,} from "react-router-dom";

import TurocardsContext from './context/turocards/turocardsContext';
import { useNavigate } from 'react-router-dom';
import SkeletonCard from './SkeletonCard';


const Index = () => {
  const navigate = useNavigate();
  const context = useContext(TurocardsContext)

  // const initialState = [];
  // const [cards, setcards] = useState(initialState);
  const { cards, ownCards, fetchAllCards } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      try{
        fetchAllCards()
      }
      catch{
        navigate("/time-out/")
      }
    }
    else {
      navigate("/login")
    }
    //eslint-disable-next-line
  }, []);

  console.log(cards)
  console.log(ownCards)
  return (
    <>
      <div className="container mt-4">
        <div className='my-5 globalcard'>
          <h2 className="bg-dark text-white px-3 py-1">All Cards</h2>
          <div className="container mx-4">
            <div className="row justify-content-center" >
              {
                cards.map((card) => {
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-4 py-3" >
                      <SkeletonCard key={card._id} card={card} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Index;
