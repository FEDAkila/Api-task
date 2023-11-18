import  { useEffect, useState } from 'react'
import './Home.scss'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router';

export const Home=()=>{ 
    const [data,setdata]=useState([])


    const[count,setCount]=useState()
    const[off,setOff]=useState(0)
    const [limit,setLimit]=useState(10)
    const [currentpage,setcurrentpage]=useState(1)
    const [totalpage,settotalpage]=useState([])
    const [page,setPage]=useState()
   
    const original=()=>{
      fetch('https://api.spacexdata.com/v3/launches')
      .then((response)=>response.json())
      .then(json=>settotalpage(json))

    }
    useEffect(()=>{
      original()

    },[])



    const read=()=>{
         fetch(`https://api.spacexdata.com/v3/launches?offset=${off}&&limit=${limit}`)
        .then((response)=>response.json())
        .then(json=>setdata(json))
       
        }
      
    console.log(data)
   
    useEffect(()=>{
        read();
        console.log(off,limit)
    },[off,limit,currentpage])

    let handlecount=(e,i)=>{
      setcurrentpage(currentpage ||i )
      // console.log(e.target.value,limit,i)
      const offsetvalue=(i*limit)-limit
      console.log(i,limit)
      console.log(offsetvalue)
   
      console.log(offsetvalue)
    
      setOff(offsetvalue)
      
      read()
      
     }

     
    
     let display=()=>{
      
      let total=totalpage.length/limit
      console.log(total)
      console.log(Math.ceil(total))

     setPage(Math.ceil(total))
      
     }
     console.log(page)
    
     useEffect(()=>{
      display()
      console.log(off,limit)
      read()
     },[limit,totalpage,off])



    
    const m=useNavigate()

    let details=(num)=>{
        console.log(num)
        m(`/Details?id=${num}`)
     }
    let handleChange=(e)=>{  
     
      console.log(e.target.value)
        setLimit(e.target.value)
        console.log(off,limit)
        handlecount()
        

    }
    
    return(
        <section id="home">
            <div className='container'>
                <div classname="row" style={{display:"flex",justifyContent:"space-between"}}>
                    <div classname="col">
                      
                    <Stack spacing={10}>
                          <Pagination count={page} color="primary" onChange={handlecount}  />
                   </Stack>

                    </div>
                    <div classname="col">
                        
                   <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          label="page"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>

                        
                    </div>
              

         

                </div>
                  <div className='row'>
       
        {data.map((v,i)=>{
            return(
                <div classname="col">
                 
                <Card sx={{ maxWidth: 345 }}>
               
      <CardMedia
        sx={{ height: 140 }}
        image={v.links.flickr_images[0]}
        title="green iguana"
      />
      <CardContent>
        <h1>FlightNumber: {v.flight_number}</h1>
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
        <Button size="small" onClick={()=>details(v.flight_number)}>View Details</Button>
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