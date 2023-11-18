import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { useNavigate } from 'react-router';

export const Details=()=>{
    const [param]=useSearchParams()
    const a=param.get('id')
    console.log(a)
    const[send,setSend]=useState([])
    const[store,setStore]=useState([])
    
    let check=()=>{
        fetch(' https://api.spacexdata.com/v3/launches')

        
        .then((response)=>response.json())
        .then(json=>setSend(json))
        
    }
    console.log(send)
    let display=()=>{
        let z=send.filter((v,i)=>{
            return v.flight_number===Number(a)
        })
        console.log(z)
        setStore(z)
        
   }
  
     useEffect(()=>{
        check();
      
           },[])
           useEffect(()=>{
            display();
           })
           


            return(
                <section id="home">
                <div className='container'>
               
                    <div className='row'>
           
            {store.map((v,i)=>{
                return(
                    <div classname="col">
                    <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={v.links.flickr_images[0]}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {v.mission_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <a href={v.links.wikipedia}>LearnMore</a>
            <Button size="small" >View Details</Button>
          </CardActions>
        </Card>
        </div>
                )
    
            })}
    
        
    
                                       </div>

                                     
                    </div>
               
            </section>
        )
    }
        