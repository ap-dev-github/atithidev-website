import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Hosts.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import review_icon from "../assets/reviewbutton.png"
import whatsapp_icon from "../assets/whatsapp.png"
import Header from '../Header/Header';

const Host = () => {


  const [host, setHost] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("host"));
  let params = useParams();
  let id =params.id;
  let host_url = root_url+`djangoapp/host/${id}`;
  let reviews_url = root_url+`djangoapp/reviews/host/${id}`;
  let post_review = root_url+`postreview/${id}`;
  
  
  
  const get_host = async ()=>{
    const res = await fetch(host_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let hostobjs = Array.from(retobj.host)
      setHost(hostobjs[0])
    }
  }

 

  const get_reviews = async ()=>{
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      if(retobj.reviews.length > 0){
        setReviews(retobj.reviews)
      } else {
        setUnreviewed(true);
      }
    }
  }

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    get_host();
    get_reviews();
    if(sessionStorage.getItem("username")) {
      setPostReview(<a href={post_review}><img src={review_icon} style={{width:'15%',marginLeft:'10px',marginTop:'10px'}} alt='Post Review'/></a>)      
    }


  },[]);  

 

return(
  <div style={{margin:"20px"}}>
      <Header/>
      <div class="host-profile-container">
      <div class="div-item"> <p> {host.full_name} </p></div>
      <div class="div-item"><p>{host['city']},{host['address']}, Zip - {host['zip']}, {host['state']}, {host['phone']} </p></div>
      <div class="div-item"><p>Get in Touch:</p><a href={`https://api.whatsapp.com/send?phone=${host['phone']}`}><img class="whatsapp-img" src={whatsapp_icon} /></a> {postReview}</div>
      
   </div> 
   <h4 > Customer Reviews:</h4>
   <div class="review-container"> 
   {reviews.length === 0 && unreviewed === false ? (
     <text>Loading Reviews....</text>
   ):  unreviewed === true? <div>No reviews yet! </div> :
   reviews.map(review => (
     <div className='review_panel'>
       <img src={senti_icon(review.sentiment)} className="emotion_icon" alt='Sentiment'/>
       <div className='review'>{review.review}</div>
       <div className="reviewer">{review.name} {review.room}{review.aminities} {review.visit_date}</div>
     </div>
   ))}

</div>  
 
  </div>
)
}

export default Host
