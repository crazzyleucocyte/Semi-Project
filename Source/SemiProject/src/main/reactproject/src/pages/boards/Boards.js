import { useState } from "react";
import {Route, Routes, Link } from 'react-router-dom';
import PostWalkList from './PostWalkList';
import PostCultureList from './PostCultureList';
import PostWalkDetail from './PostWalkDetail';
import PostCultureDetail from './PostCultureDetail'; // PostCultureDetail import 추가
import PostReviewDetail from './PostReviewDetail';
import Weather from "../weather/Weather";
import UpdateReviewDetail from "./UpdateReviewDetail";

export default function Boards(){
 

    return(
        <>
        <Routes>
          
          <Route path="/walk" element={<PostWalkList  />} />
          <Route path="/walk/:id" element={<PostWalkDetail  />} />
          
          {/* <Route path="/api" element={<Test  handleSetcityInfo={handleSetcityInfo}/>} />  */}
          <Route path='/weather' element={<div><Weather /></div>}/>
          <Route path="/walk" element={<PostWalkList />} />
          <Route path="/walk/:id" element={<PostWalkDetail />} />
          <Route path="/culture" element={<PostCultureList />} />
          <Route path="/culture/:id" element={<PostCultureDetail />} />
          <Route path="/review/:id/:category" element={<PostReviewDetail />}
          />
          <Route path="/review/update/:id/:category" element={<UpdateReviewDetail />}/>
        </Routes>
        </>
    )
}

