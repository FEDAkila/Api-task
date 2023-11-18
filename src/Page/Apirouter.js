import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

 import { Home } from '../Page/Home';  
import { Details } from "../Page/Details";






export const Apirouter=()=>{
    return(
        <BrowserRouter>
        <Routes>
             <Route path="/" element={<Home/>} >   </Route>
             <Route path="/Details" element={<Details/>} >   </Route>
         <Route ></Route>

           

        </Routes>

        </BrowserRouter>
    )
}