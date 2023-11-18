import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './Home';  
import {Details} from './Details'





export const Router=()=>{
    return(
        <BrowserRouter >
        <Routes>
            <Route path="/" element={<Home/>}>   </Route>
            <Route path="/Details"  element={<Details/>}></Route>

           

        </Routes>

        </BrowserRouter>
    )
}