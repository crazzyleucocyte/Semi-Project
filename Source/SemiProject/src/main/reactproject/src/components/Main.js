
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 관련 컴포넌트
import { Navigation, Pagination, Autoplay } from "swiper"; // 필요한 모듈
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { Link } from "react-router-dom";
import React, { useState} from 'react';
import '../assets/Header.css';
import '../assets/Main.css';
import '../assets/Footer.css';
import main1 from '../assets/main1.jpg';
import main2 from '../assets/main2.jpg';
import main3 from '../assets/main3.jpg';
import Header from './Header';
import Footer from './Footer';
function Main() {
  
  return (
    <body className="mainbody"> 
    < Header/> 
    {/* 1번째 article */}
    <article>
    <nav>
     <div className="main1">
     날씨 경로 목록
    </div>  
        <div className="maindiv1">
          <Link className="mainlink1" to="/walk">
            {/* public 폴더에 저장된 이미지 사용 */}
            <img src={main1} alt="1번사진" width="300" height="150"/>
          </Link>
        </div>
        <div>
            후기 : 
        </div>
      </nav>
    </article>
    
    {/* 2번째 article */}
    <article>
    <nav>
     <div className="main2">
     산책 경로 목록
        </div>
            <div className="maindiv2">  
                     
            <Link className="mainlink2" to="/walk">
            {/* public 폴더에 저장된 이미지 사용 */}
            <img src={main2} alt="2번사진" width="300" height="150"/>
          </Link>
            </div>    
            <div>
            후기 : 
        </div>         
      </nav>
    </article>

    {/* 3번째 article */}
    <article>
    <nav>
     <div className="main3">
     문화 경로 목록
        </div>
            <div className="maindiv3">   
            <Link className="mainlink3" to="/culture">
            {/* public 폴더에 저장된 이미지 사용 */}
            <img src={main3} alt="3번사진" width="300" height="150"/>
          </Link>
            </div>     
            <div>
            후기 : 
        </div>   
      </nav>
    </article>
    <Footer />
    </body>
  );
  
}

export default Main;
