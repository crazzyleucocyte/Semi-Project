import { useState } from "react";
import {Route, Routes, Link } from 'react-router-dom';
import PostWalkList from './PostWalkList';
import PostCultureList from './PostCultureList';
import PostWalkDetail from './PostWalkDetail';
import PostCultureDetail from './PostCultureDetail'; // PostCultureDetail import 추가
import PostReviewDetail from './PostReviewDetail';
import Weather from "../weather/Weather";
import Header from "../../components/Header";

export default function Boards({isLoggedIn, handleAddReview,reviews}){
    
    
    
    const [cityInfo, setCityInfo] = useState({
        la : "",
        lo : "",
        ctprvnNm : "",
        signguNm : ""
    });
    const handleSetcityInfo = (newcityInfo) => {
        setCityInfo(prevCityInfo => ({
          ...prevCityInfo,
         ...newcityInfo
        }));
      };

    return(
        <>
        {/* <Header/> */}
        <Routes>
            {/* <Route path="/api" element={<Test  handleSetcityInfo={handleSetcityInfo}/>} />  */}
            <Route path='/weather' element={<div><Weather handleSetcityInfo={handleSetcityInfo} cityInfo={cityInfo}/></div>}/>
            <Route path="/walk" element={<PostWalkList isLoggedIn={isLoggedIn} />} />
            <Route path="/walk/:id" element={<PostWalkDetail onAddReview={handleAddReview} isLoggedIn={isLoggedIn} reviews={reviews} handleSetcityInfo={handleSetcityInfo} />} />
            <Route path="/culture" element={<PostCultureList isLoggedIn={isLoggedIn} />} />
          <Route path="/culture/:id" element={<PostCultureDetail isLoggedIn={isLoggedIn} handleSetcityInfo={handleSetcityInfo}/>} />
          <Route
            path="/review/:id/:category"
            element={<PostReviewDetail onAddReview={handleAddReview} />}
          />
        </Routes>
        </>
    )
}

