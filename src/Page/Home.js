import React from "react";
import  { useEffect, useState } from 'react'
import './Home.scss'
import { useNavigate } from "react-router";

export const Home=()=>{
    const [save,setsave]=useState([])
    const [name,setName]=useState("")
    const [search,setSearch]=useState('')
    const original=()=>{
        fetch('https://api.tvmaze.com/shows/1/episodes')
        .then((response)=>response.json())
      .then(json=>setsave(json))

           }
    useEffect(()=>{
       original()
    },[])
   
    const m=useNavigate()
    const goto=(id)=>{
        m(`/Details?id=${id}`)

    }
    const handle=(e)=>{
         console.log(e.target.value)
        
        setName(e.target.value)
     }
          console.log(name)
         
  

    return(
        <section id="home">
            <div className="container">
                <div style={{textAlign:"center",padding:"10px 0"}}>
                    <input type="text" placeholder="Search" style={{padding:"10px 20px",borderRadius:"10px",width:"30%"}} onChange={(e)=>setSearch(e.target.value)}></input>
                </div>

           
        <div style={{display:"flex",flexWrap:"wrap",padding:"20px 0"}}>
        {save.filter((v,i)=>{
            return search.toLowerCase()===''? v:v.name.toLowerCase().includes(search)

        }).map((v,i)=>{
            return(
                <div style={{width:"25%",padding:"15px"}} className="col" key={i}>
                    
                    <div style={{padding:"30px 0",border:"1px solid gray",textAlign:"center"}}>
                    <div style={{padding:"0px 10px"}}>
                    <img src={v.image.medium} style={{width:"100%"}} onClick={()=>goto(v.id)}></img>
                    </div>
                    <h3>ID: {v.id}</h3>

                    <h4>Name: {v.name}</h4> 
                    
                    <p>Date: {v.airdate}</p>
                    <p>Time: {v.airtime}</p>
                    <p>Rating: {v.rating.average}</p>
                    
                 </div>
                 </div>
            )
          })} 
        </div>
        </div>
      
        </section>
    )
}