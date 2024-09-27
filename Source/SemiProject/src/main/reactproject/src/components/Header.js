
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 관련 컴포넌트
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from "react-router-dom";
import '../assets/Header.css';
import { Autoplay, Navigation } from "swiper/modules";

function Header() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("username")

  return (
    <header>
      <div className="logo-logout">
        <div className="logo" onClick={() => { navigate('/main') }}>
          <img className="logoImg" src={process.env.PUBLIC_URL + '/img/main/logo.png'} />
          <div className="logoTitleDiv">
            <span className="logoTitle">산책누리</span>
          </div>
        </div>
        <div className="logoutDiv">
          <div className="logout">
            <span className="welcomeMsg"><span className="userId">{userId}</span> 님 환영합니다.</span>&emsp;
            <span className="logoutButton" onClick={() => { localStorage.clear(); sessionStorage.clear(); navigate("/") }}>Logout</span>
          </div>
        </div>
      </div>

      <div className="swiper-container">
        <Swiper
          className="headerSwiper"
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => { console.log(swiper) }}
          autoplay={{ // 자동 재생
            delay: 10000, // 지연 시간 (한 슬라이더에 머물르는 시간)
          }}
          speed={500}
          navigation={true}
        >

          <SwiperSlide>
            <div className="slide-content" id="banner1">
              <img className="banner" src={process.env.PUBLIC_URL + '/img/main/banner1.jpg'} alt="1번사진" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content" id="banner2">
              <img className="banner" src={process.env.PUBLIC_URL + '/img/main/banner2.jpg'} alt="2번사진" />
            </div>

          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content" id="banner3">
              <img className="banner" src={process.env.PUBLIC_URL + '/img/main/banner3.jpg'} alt="3번사진" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="div2">
        <ul className="navBar">
          <li className="nav" onClick={() => { navigate('/weather') }}>
            <span>날씨 보기</span>
          </li>
          <li className="nav" onClick={() => { navigate('/walk') }}>
            <span>산책 경로 목록</span>
          </li>
          <li className="nav" onClick={() => { navigate('/culture') }}>
            <span>문화 시설 목록</span>
          </li>
          <li className="nav-drop" >
            <span id="dropdown"><span>마이페이지</span>
              <ul className="dropdownMenu">
                <li onClick={() => { navigate('/password-check') }} className="dropdownItem"><span>개인정보 수정</span></li>
                <li onClick={() => { navigate('/review-history') }} className="dropdownItem"><span>리뷰 목록</span></li>
                <li onClick={() => { navigate('/likes-history') }} className="dropdownItem"><span>좋아요 내역</span></li>
              </ul>
            </span>
          </li>
        </ul>
      </div>
    </header>
  );

}

export default Header;
