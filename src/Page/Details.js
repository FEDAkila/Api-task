import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
                    <div style={{textAlign:"center"}}>
                       <h3>{v.name}</h3> 
                       <img src={v.image.original}></img>
                    </div>
                )
            })}
        </div>
    )
}