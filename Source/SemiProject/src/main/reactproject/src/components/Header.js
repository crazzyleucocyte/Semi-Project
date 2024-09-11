
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 관련 컴포넌트
import { Navigation } from "swiper"; // 필요한 모듈
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { Link } from "react-router-dom";
import React, { useState} from 'react';
import '../assets/Header.css';
import banner from '../assets/banner.jpg';
import banner2 from '../assets/banner.jpg';
import banner3 from '../assets/banner3.jpg';
import icon from '../assets/icon.jpg';
function Header() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header> 

     <div className="swiper-container">
        <Swiper
         modules={[Navigation]}
         spaceBetween={50}
         slidesPerView={1}
         navigation={{
           nextEl: ".custom-next",
           prevEl: ".custom-prev",
         }}>
          
        <SwiperSlide>
          <div className="slide-content">
          <img src={banner} alt="1번사진" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content">
          <img src={banner2} alt="2번사진" />
          </div>
       
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="slide-content">
          <img src={banner3} alt="3번사진" />
          </div>
        </SwiperSlide>
        </Swiper>
            {/* 커스텀 내비게이션 버튼 */}
        
        <div>
         <button className="custom-prev">

         </button>

        </div>

           <div>
              <button className="custom-next">
         
              </button>
           </div>
    
        </div>
      
        <div className="div2">
        <ul>
            <div className="div3">   
              <Link className="custom-link1" to="/walk">날씨 경로 목록</Link>
              <Link className="custom-link2" to="/walk">산책 경로 목록</Link>
              <Link className="custom-link3" to="/culture">문화 경로 목록</Link>
              <div className="dropdown">
            <Link className="custom-link4" onClick={toggleDropdown}>
                마이페이지
              </Link>
            {isOpen && (
              <div className="dropdown-menu">
                <Link to="/walk" className="dropdown-item">날씨 경로 목록</Link>
                <Link to="/walk" className="dropdown-item">산책 경로 목록</Link>
                <Link to="/culture" className="dropdown-item">문화 경로 목록</Link>
              </div>
            )}
          </div>
            </div>
         
        </ul>
        </div>    
 
    </header>
  );
  
}

export default Header;
