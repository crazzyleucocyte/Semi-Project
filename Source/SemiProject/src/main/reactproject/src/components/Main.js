import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../assets/Header.css';
import '../assets/Main.css';
import '../assets/Footer.css';
import main1 from '../assets/main1.jpg';
import main2 from '../assets/main2.jpg';
import main3 from '../assets/main3.jpg';
import Header from './Header';
import Footer from './Footer';

function Main() { 
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // localStorage에서 저장된 username을 불러옵니다.
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }

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
  }, []);

  return (
    <div className="mainbody"> 
      <Header/> 

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
        <Link className="mainlink1" to="/walk">
          날씨 경로 목록
        </Link>
      </div>  
      <article>
        <div className="maindiv1">    
          <Link className="mainlink1" to="/walk">
            <img src={main1} alt="1번사진" width="100%" height="220"/>
          </Link>
          <div>
            후기 : 
          </div>
        </div>
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
            <img src={main2} alt="2번사진" width="100%" height="220"/>
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
            <img src={main3} alt="3번사진" width="100%" height="220"/>
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