import React, { useState, useEffect,useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../assets/Header.css';
import '../assets/Main.css';
import '../assets/Footer.css';
import '../assets/Weather.css'
// import main1 from '../assets/main1.jpg';
// import main2 from '../assets/main2.jpg';
// import main3 from '../assets/main3.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Main() { 
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [shortWeather, setShortWeather] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const scrollContainerRef = useRef(null); // 스크롤 컨테이너를 참조하기 위한 useRef 훅
  const mainWeather={
    la : "37.5635694444444",
    lo : "126.980008333333",
    
  }
  const Caller = function(){
    setLoading(true)
    console.log("mainWeather : ", mainWeather)
    axios.post('/api/weather/short', mainWeather)
    .then(({data}) =>{
        console.log('data',data)
        // setWeatherResult(...result.data)
        
        try {
            
            setShortWeather([...data])
        } catch (error) {
            console.log(error)                
        }
        
        setLoading(false)
        console.log("shortWeather ",shortWeather)
    })
    .catch((error)=>{
        window.alert(error)
    })

}
  useEffect(()=>{
    console.log(loading)
  },[loading])
  useEffect(() => {
    // localStorage에서 저장된 username을 불러옵니다.
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    //날씨 API호출
    Caller();

    // 서버에서 사용자 데이터를 가져옵니다.
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/data', { params: { username: savedUsername } });
        setUserData(response.data);
      } catch (error) {
        console.error("서버에서 사용자 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    if (savedUsername) {
      fetchUserData();
    }

    //횡스크롤을 위한 useRef
    const container = scrollContainerRef.current;
    
    // 마우스 휠 이벤트 핸들러
    const handleWheel = (event) => {
        console.log(event.deltaY*1.5)
        event.preventDefault(); // 기본 수직 스크롤 방지
        container.scrollLeft += event.deltaY*1.5; // 세로 스크롤을 가로 스크롤로 변환
      };
      
      // 이벤트 리스너 추가
      container.addEventListener("wheel", handleWheel);
      
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
  }, []);
  const skyImg = ['',process.env.PUBLIC_URL + "/img/weather/sun.png",'',process.env.PUBLIC_URL + "/img/weather/cloudy.png",process.env.PUBLIC_URL + "/img/weather/cloud.png"]
  const ptyImg = ['',process.env.PUBLIC_URL + "/img/weather/rainy.png",process.env.PUBLIC_URL + "/img/weather/rainy.png", process.env.PUBLIC_URL + "/img/weather/snowy.png",process.env.PUBLIC_URL + "/img/weather/storm.png"];
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/weather/weatherBackImg.jpg)`,
    backgroundSize: "cover", // 이미지를 전체 배경으로 설정
    
  };
  const handleshortWeather = (newWeather) => {
    setShortWeather(prevWeather => ({
      ...prevWeather,
     ...newWeather
    }));
  };
  
  return (
    <div className="mainbody"> 
      {/* <Header/>  */}

      {/* 환영 메시지 */}
      {username && <div className="welcome-message">안녕하세요, {username}님!</div>}
      
      {/* 서버에서 받아온 사용자 데이터 표시 */}
      {userData && (
        <div className="user-data">
          <p>최근 산책 경로: {userData.recentWalk}</p>
          <p>총 산책 거리: {userData.totalDistance} km</p>
        </div>
      )}

      {/* 1번째 article */}
      <div className="main1">  
        <Link className="mainlink1" to="/weather">
        </Link>
      </div>  
        <h3>서울의 날씨</h3>
      <article>
        {/* <div className="maindiv1">     */}
          <Link className="mainlink1" to="/weather">
            {/* <img src={process.env.PUBLIC_URL+'/img/main/main1.jpg'} alt="1번사진" width="100%" height="220"/> */}
            <div className="weather" style={divStyle}>
        <div className="scroll-container"  ref={scrollContainerRef}>
            <div className="scroll-content">

                {shortWeather.map((value, i) => {
                    let img = value.ptyValue ==0 ? skyImg[value.skyValue] : ptyImg[value.ptyValue];
                    let date = value.fcstDate.substr(4,2) +' / '+ value.fcstDate.substr(6,2);
                    let fcstTime = parseInt(value.fcstTime.substr(0,2));
                    let time =  fcstTime == 0? '오전 12': fcstTime <12 ? '오전'+fcstTime : fcstTime==12 ? '오후'+ fcstTime :'오후' + (fcstTime-12);
                    return(
                        
                        <div className="item">
                            <div className="itemDetail">
                                <span className="date">{date}</span>
                                <span className="imgDiv"><img className = "weatherImg" src ={img}/></span>&emsp;
                                <span className="time">{time}시</span>&emsp;
                                {/* <span className="dscript"></span>&emsp; */}
                                <span className="tmpPop"><span>&ensp;&ensp;기온&ensp;&ensp;강수확률</span><br/>{value.tmpValue}°C&ensp;/&ensp;{value.popValue}%</span>&emsp;
                                {/* <div className="side"></div> */}
                            </div>
                        </div>
                        )
                    })}
            </div>
            </div>
        </div>
          </Link>
          
        {/* </div> */}
      </article>

      {/* 2번째 article */}
      <div className="main2">
        <Link className="mainlink2" to="/walk">
          산책 경로 목록
        </Link>
      </div>
      <article>
        <div className="maindiv2">              
          <Link className="mainlink2" to="/walk">
            <img src={process.env.PUBLIC_URL+'/img/main/main2.jpg'} alt="2번사진" width="100%" height="220"/>
          </Link>
          <div>
            후기 : 
          </div>    
        </div>    
      </article>

      {/* 3번째 article */}   
      <div className="main3">
        <Link className="mainlink3" to="/culture">
          문화 경로 목록
        </Link>
      </div>
      <article>
        <div className="maindiv3">   
          <Link className="mainlink3" to="/culture">
            <img src={process.env.PUBLIC_URL+'/img/main/main3.jpg'} alt="3번사진" width="100%" height="220"/>
          </Link>
          <div>
            후기 : 
          </div>   
        </div>
      </article>

      <Footer />
    </div>
  );
}

export default Main;