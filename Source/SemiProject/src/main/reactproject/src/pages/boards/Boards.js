import { useState } from "react";
import {Route, Routes, Link } from 'react-router-dom';
import PostWalkList from './PostWalkList';
import PostCultureList from './PostCultureList';
import PostWalkDetail from './PostWalkDetail';
import PostCultureDetail from './PostCultureDetail'; // PostCultureDetail import 추가
import PostReviewDetail from './PostReviewDetail';
import Weather from "../weather/Weather";

export default function Boards({isLoggedIn, handleAddReview,reviews}){
   

    return(
        <>
        <Routes>
            {/* <Route path="/api" element={<Test  handleSetcityInfo={handleSetcityInfo}/>} />  */}
            <Route path='/weather' element={<div><Weather /></div>}/>
            <Route path="/walk" element={<PostWalkList isLoggedIn={isLoggedIn} />} />
            <Route path="/walk/:id" element={<PostWalkDetail onAddReview={handleAddReview} isLoggedIn={isLoggedIn} reviews={reviews}  />} />
            <Route path="/culture" element={<PostCultureList isLoggedIn={isLoggedIn} />} />
          <Route path="/culture/:id" element={<PostCultureDetail isLoggedIn={isLoggedIn} />} />
          <Route
            path="/review/:id/:category"
            element={<PostReviewDetail onAddReview={handleAddReview} />}
          />
        </Routes>
        </>
    )
}

