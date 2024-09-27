import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../assets/Header.css';
import '../assets/Main.css';
import '../assets/Footer.css';
import '../assets/Weather.css'
import 'swiper/css/navigation';
import 'swiper/css';

function Main() {
  const [shortWeather, setShortWeather] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [cultureBoard, setCultureBoard] = useState([]);
  const scrollContainerRef = useRef(null); // 스크롤 컨테이너를 참조하기 위한 useRef 훅
  const navigate = useNavigate();
  const mainWeather = {
    la: "37.5635694444444",
    lo: "126.980008333333",
  }
  const Caller = function () {
    setLoading(true)
    console.log("mainWeather : ", mainWeather)
    axios.post('/api/weather/short', mainWeather)
      .then(({ data }) => {
        console.log('data', data)
        try {
          setShortWeather([...data])
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
        console.log("shortWeather ", shortWeather)
      })
      .catch((error) => {
        window.alert(error)
      })
    //사진이 있는 게시물 가져오는 axios
    axios.get('/culture/main/data')
      .then((response) => {
        console.log(response.data)
        setCultureBoard(response.data)
        console.log(cultureBoard)
      })
      .catch((error) => {
        window.alert(error)
      })
  }
  useEffect(() => {
    console.log(loading)
  }, [loading])
  useEffect(() => {
    //날씨 API호출
    Caller();
    //횡스크롤을 위한 useRef
    const container = scrollContainerRef.current;

    // 마우스 휠 이벤트 핸들러
    const handleWheel = (event) => {
      console.log(event.deltaY * 1.5)
      event.preventDefault(); // 기본 수직 스크롤 방지
      container.scrollLeft += event.deltaY * 1.5; // 세로 스크롤을 가로 스크롤로 변환
    };
    // 이벤트 리스너 추가
    container.addEventListener("wheel", handleWheel);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);
  const skyImg = ['', process.env.PUBLIC_URL + "/img/weather/sun.png", '', process.env.PUBLIC_URL + "/img/weather/cloudy.png", process.env.PUBLIC_URL + "/img/weather/cloud.png"]
  const ptyImg = ['', process.env.PUBLIC_URL + "/img/weather/rainy.png", process.env.PUBLIC_URL + "/img/weather/rainy.png", process.env.PUBLIC_URL + "/img/weather/snowy.png", process.env.PUBLIC_URL + "/img/weather/storm.png"];
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/weather/weatherBackImg.jpg)`,
    backgroundSize: "cover", // 이미지를 전체 배경으로 설정
    height: "300px"
  };
  return (
    <div >
      <br /><br /><br /><br />
      {/* 1번째 article */}
      <span className='mainTitle'><h1>서울의 날씨</h1></span>
      <br />
      <article onClick={() => { navigate('/weather') }} className='weatherArticle'>
        {loading ? <div className="loadingMainDiv" ><img className="loadingImg" src={process.env.PUBLIC_URL + '/img/loading.gif'} /><span>로딩중...</span></div> : ''}
        <div className="weather" style={divStyle}>
          <div className="scroll-container" ref={scrollContainerRef}>
            <div className="scroll-content">
              {shortWeather.map((value, i) => {
                let img = value.ptyValue == 0 ? skyImg[value.skyValue] : ptyImg[value.ptyValue];
                let date = value.fcstDate.substr(4, 2) + ' / ' + value.fcstDate.substr(6, 2);
                let fcstTime = parseInt(value.fcstTime.substr(0, 2));
                let time = fcstTime == 0 ? '오전 12' : fcstTime < 12 ? '오전' + fcstTime : fcstTime == 12 ? '오후' + fcstTime : '오후' + (fcstTime - 12);
                return (
                  <div className="item">
                    <div className="itemDetail">
                      <span className="date">{date}</span>
                      <span className="imgDiv"><img className="weatherImg" src={img} /></span>&emsp;
                      <span className="time">{time}시</span>&emsp;
                      <span className="tmpPop"><span>&ensp;&ensp;기온&ensp;&ensp;강수확률</span><br />{value.tmpValue}°C&ensp;/&ensp;{value.popValue}%</span>&emsp;
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </article>
      {/* 2번째 article */}
      <br /><br /><br /><br />
      <span className='mainTitle'><h1>인기 산책로</h1></span><br />
      <article className='boardContainer' >
        <div className='boardArticle'  >
          <div className='board-content'>
            {cultureBoard.map((value) => {
              const petEnterYN = value.petEntrYn === 'Y' ? '반려동물 입장 가능' : '반려동물 입장 불가';
              return (
                <div className='cultureDiv'>
                  <div className='cultureImgDiv' onClick={() => { navigate(`/culture/${value.cid}`) }}>
                    <img className='cultureImg' src={value.picturePath} />
                  </div>
                  <div className='cultureDescDiv'>
                    <span className='cultureCategory'>{value.ctgryTwo}</span>
                    <span className='culturename'>{value.fcltyName}({value.ctprvnName})</span>
                    <span className='culturePetEnter'>{petEnterYN}</span>
                    <span className='cultureLike'>❤️{value.likeCount}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </article>
    </div>
  );
}

export default Main;