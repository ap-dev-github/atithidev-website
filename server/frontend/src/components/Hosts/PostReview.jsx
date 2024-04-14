import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Hosts.css";
import "../assets/style.css";
import Header from '../Header/Header';


const PostReview = () => {
  const [host, setHost] = useState({});
  const [review, setReview] = useState("");
  const [room, setRoom] = useState();
  const [date, setDate] = useState("");
  const [rooms, setRooms] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let host_url = root_url+`djangoapp/host/${id}`;
  let review_url = root_url+`djangoapp/add_review`;
  let rooms_url = root_url+`djangoapp/get_rooms`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!room || review === "" || date === ""  || room === "") {
      alert("All details are mandatory")
      return;
    }

    let room_split = room.split(" ");
    let room_chosen = room_split[0];
    let amenities_chosen = room_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "host": id,
      "review": review,
      "visit": true,
      "visit_date": date,
      "amenities": amenities_chosen,
      "room": room_chosen,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (json.status === 200) {
      window.location.href = window.location.origin+"/host/"+id;
  }

  }
  const get_host = async ()=>{
    const res = await fetch(host_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let hostobjs = Array.from(retobj.host)
      if(hostobjs.length > 0)
        setHost(hostobjs[0])
    }
  }

  const get_rooms = async ()=>{
    const res = await fetch(rooms_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    // let carmodelsarr = Array.from(retobj.CarModels)
    let roomsarr = retobj["Rooms"]
    setRooms(roomsarr)
  }
  useEffect(() => {
    get_host()
    get_rooms();
  },[]);


  return (
    <div>
      <Header/>
      <div  style={{margin:"5%"}}>
      <h1 style={{color:"darkblue"}}>{host.full_name}</h1>
      <textarea id='review' cols='50' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
      <div className='input_field'>
      Visit Date <input type="date" onChange={(e) => setDate(e.target.value)}/>
      </div>
      <div className='input_field'>
      Room and Amenities
      <select name="rooms" id="rooms" onChange={(e) => setRoom(e.target.value)}>
      <option value="" selected disabled hidden>Choose Room and Aminities</option>
      {rooms.map(room => (
          <option value={room["Room"]+" "+room["Amenities"]}> {room["Room"] } - {room["Amenities"]} </option>
      )) }
      </select>        
      </div >
      <div>
      <button className='postreview' onClick={postreview}>Post Review</button>
      </div>
    </div>
    </div>
  )
}
export default PostReview
