import { Link } from "react-router-dom";
import React from 'react';
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
    <div className="main1">  
     <Link className="mainlink1" to="/walk">
     날씨 경로 목록
      </Link>
    </div>  
    <article>
        <div className="maindiv1">    
        <Link className="mainlink1" to="/walk">
            {/* public 폴더에 저장된 이미지 사용 */}
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
            {/* public 폴더에 저장된 이미지 사용 */}
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
            {/* public 폴더에 저장된 이미지 사용 */}
            <img src={main3} alt="3번사진" width="100%" height="220"/>
          </Link>
          <div>
            후기 : 
        </div>   
            </div>
    </article>
    <Footer />
    </body>
  );
  
}

export default Main;
