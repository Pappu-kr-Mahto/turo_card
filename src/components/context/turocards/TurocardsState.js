import React, { useState  } from "react";
import TurocardsContext from "./turocardsContext";
// import { useNavigate } from 'react-router-dom';

const TurocardsState = (props) =>{
  // const navigate = useNavigate();
    const initialState = [];
    const [cards, setCards] = useState(initialState);
    const [ownCards, setownCards] = useState(initialState);
    const [username,setUser] = useState("");

    // const host="http://localhost:8000";
    const host ="https://turo-card-server.vercel.app/"

    const fetchAllCards = async () =>{
        const response = await fetch(`${host}/api/turoCards/`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem('token') 
           
            },
        });
        const allcards = await response.json();
        console.log(allcards)
        
        setCards(allcards.data2);
        setownCards(allcards.data1);
        setUser(allcards.user)
    };

    const createTuroCard = async (formData) =>{
      
      console.log(formData+"jjjjjjj");
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
      const response = await fetch(`${host}/api/turoCards/`,{
          method:"POST",
          headers:{
            "Authorization":"Bearer "+localStorage.getItem('token') 
          },
          body: formData,
          
      });
      const res = await response.json();  
      if(res.success){
       
      }
    };

    const likeStatus = async (data) =>{
    console.log(data)
    const response = await fetch(`${host}/api/turoCards/likeStatus/`,{
        method:"POST",
        headers:{
         'Content-Type': 'application/json',
         "Authorization":"Bearer "+localStorage.getItem('token') 
        },
        body:JSON.stringify(data),   
    });
    const res = await response.json();  
    console.log(res)
    
    };

    const addComment = async (data) =>{
      console.log(data)
      const response = await fetch(`${host}/api/turoCards/addComment/`,{
          method:"POST",
          headers:{
           'Content-Type': 'application/json',
           "Authorization":"Bearer "+localStorage.getItem('token') 
          },
          body:JSON.stringify(data),   
      });
      const res = await response.json();
      console.log(res)  
    };
    
    const SwapRequest = async (data) =>{
      const response = await fetch(`${host}/api/turoCards/swaprequest/`,{
          method:"POST",
          headers:{
           'Content-Type': 'application/json',
           "Authorization":"Bearer "+localStorage.getItem('token') 
          },
          body:JSON.stringify(data),   
      });
      const res = await response.json();  
      console.log(res)
      return "Hello";
    };

    return (
        <TurocardsContext.Provider
          value={{ cards,ownCards,username, fetchAllCards, createTuroCard ,likeStatus,addComment,SwapRequest}}
        >
          {props.children}
        </TurocardsContext.Provider>
      );

}
export default TurocardsState;