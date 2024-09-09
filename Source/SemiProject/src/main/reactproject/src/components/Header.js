
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 관련 컴포넌트
import { Navigation, Pagination, Autoplay } from "swiper"; // 필요한 모듈
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
function Header() {
  const handleSlideChange = (swiper) => {
    console.log("현재 슬라이드 인덱스:", swiper.activeIndex);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header> 
     <nav>
     <div className="div1">
        <Swiper
        // Swiper 설정
        modules={[Navigation, Pagination, Autoplay]} // 사용할 모듈 설정
        onSlideChange={handleSlideChange}>
        {/* 각각의 배너 이미지 슬라이드 */}
        <SwiperSlide>
        <img src={banner} alt="1번사진" />
        </SwiperSlide>
        <SwiperSlide>
        <img src={banner2} alt="2번사진" />
        </SwiperSlide>
        <SwiperSlide>
        <img src={banner3} alt="3번사진" />
        </SwiperSlide>
        </Swiper>
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
      </nav>
    </header>
  );
  
}

export default Header;
