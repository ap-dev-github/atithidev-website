import React, { useState, useEffect } from 'react';
import "./Hosts.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Hosts = () => {
  const [hostsList, setHostsList] = useState([]);
  let [states, setStates] = useState([])

  let host_url ="/djangoapp/get_hosts";
  let host_url_by_state = "/djangoapp/get_hosts/";

  const filterHosts = async (state) => {
    host_url_by_state = host_url_by_state+state;
    const res = await fetch(host_url_by_state, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let state_hosts = Array.from(retobj.hosts)
      setHostsList(state_hosts)
    }
  }

  const get_hosts = async ()=>{
    const res = await fetch(host_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let all_hosts = Array.from(retobj.hosts)
      let states = [];
      all_hosts.forEach((host)=>{
        states.push(host.state)
      });

      setStates(Array.from(new Set(states)))
      setHostsList(all_hosts)
    }
  }
  
  useEffect(() => {
    get_hosts();
  },[]);  

  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

  const handleHostClick=(hostID)=>{
    window.location.href='/host/'+hostID;
  };

  return(
    <div>
      <Header/>
      <div class="select-state"> <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="state" id="state"  onChange={(e) => filterHosts(e.target.value)}>
      <option value="" selected disabled hidden>Select State</option>
      <option value="All">All States</option>
      {states.map(state => (
          <option value={state}>{state}</option>
      ))}
      </select> </div>
           <div className="hosts-container">
           
        {hostsList.map(host => (
          <div className="host-item" onClick={()=>handleHostClick(host.id)} key={host.id}>
            <div class="div-item"><p class="div-p"><b>ID:</b> {host.id}</p></div>
            <div class="div-item"><p class="div-p"><b>{host.full_name}</b></p></div>
            <div class="div-item"><p class="div-p"><b>City:</b> {host.city}</p></div>
            <div class="div-item"><p class="div-p"><b>Address: </b>{host.address}</p></div>
            <div class="div-item"><p class="div-p"><b>Phone:</b> {host.phone}</p></div>
            <div class="div-item"><p class="div-p"><b>State:</b> {host.state}</p></div>
            {isLoggedIn && (
              <div class="div-item"><p class="div-p"><b>Write Review:</b></p><a href={`/postreview/${host.id}`}><img src={review_icon} className="review_icon" alt="Post Review"/></a></div>
            )}
          </div>
        ))}
      </div>
      </div>
  
  )
}

export default Hosts
