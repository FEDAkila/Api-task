import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './Details.scss'

export const Details=()=>{
    const [param]=useSearchParams()
    const a=param.get('id')
    console.log(a)
    const [show,setShow]=useState([])
    const [update,setUpdate]=useState([])
    const compare=()=>{

        fetch('https://api.tvmaze.com/shows/1/episodes')
         .then((response)=>response.json())
        .then(json=>setShow(json))
     }
    useEffect(()=>{
        compare()
    },[])
    const display=()=>{
        let c=show.filter((v,i)=>{
            return v.id===Number(a)
        })
    
       setUpdate(c)
     }

    useEffect(()=>{
        display()
    })
    
    return(
        
        <div>
            {update.map((v,i)=>{
                return(
                    <section>
                        <div style={{width:"90%",margin:"0 auto",padding:"10px 0"}}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="ch" >
                        <div style={{padding:"10px"}} className="ali">
                       <img src={v.image.original}></img>
                       </div>
                       <div style={{padding:"10px"}} className="ali">
                       <p><h3 style={{display:"inline-block"}}>Movie Name:</h3> {v.name}</p> 
                       <p><h3 style={{display:"inline-block"}}>Movie Time:</h3> {v.airtime}</p>
                       <p><h3 style={{display:"inline-block"}}>Movie Date:</h3> {v.airdate}</p>
                        <h3 style={{paddingBottom:"5px"}}>Summary:</h3>
                        <p style={{paddingBottom:"20px"}} >{v.summary}</p>
                        <span style={{fontSize:"18px",fontWeight:"700"}}>Reference Link: </span>
                        <a style={{textDecoration:"none",color:"blue"}} href={v.url} target="_blank">Link</a>
                        </div>

                    </div>
                    </div>
                    </section>
                )
            })}
        </div>

    )
}