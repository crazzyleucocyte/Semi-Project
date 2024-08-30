import logo from './logo.svg';
import './assets/App.css';
import axios from 'axios';
import {useState, useEffect} from 'react'

/*
	* 4조 프로젝트 작업 시작 전 꼭 읽을 사항
	
	1. 긴헙에서 download를 했는데 gradle이 안보이는 경우
		1) 왼쪽 상단 File
		2) import
		3) gradle 검색
		4) Existing Gradle Project import
		
	2. 깃헙에서 download을 했을경우 필수 설치 모듈
		1) npm i   					(기본 모듈 설치)
		2) npm i react-router-dom	(페이지 전환을 위한 필수 모듈 리액트 라우터)
		3) npm i axios				(서버와 통신간 필수 모듈 axios)
 	
 	3. Progress 창 꼭 띄우고 작업하기
 		Progress 진행중에 다른 작업을 할 경우 파일 충돌이 날 수 있기 때문에 
 		작업 시작하기전 항상 구석에 창을 띄우기
 		
 	4. 메소드 및 중요한 코드에는 꼭 주석 달기
 		혼자 하는 작업이 아니라 팀 프로젝트입니다.
 		본인은 코드에 대해 알고 있어도 다른 사람들은 해당 코드 파악하는데에 시간이 오래 걸립니다.
 		그러니 간단한 주석이라도 꼭 달아주시면 감사드리겠습니다.
 		현업에서도 중요시 여기는 부분이니 꼭 준수해주시기 바랍니다.

*/

function App() {
	//테스트로 작성한 코드입니다. 실행 결과 웹페이지에 test라고 뜬걸 보신 후 작업 시작해주시기 바랍니다.
	
	//test를  위한 useState
	let[test,setTest] = useState('');
	// /test경로로 axios요청 
	useEffect(()=>{
    axios.get(`/test`)
    // 성공 결과를 test에 저장
    .then((resultfrBk,status)=> setTest(resultfrBk.data))
    .catch(()=> console.log('실패'))
 	 },[])
 	 
  return (
    <div className="App">
      {/* 서버에서 받은 값 출력 */}
        <h1>{test}</h1>
    </div>
  );
}

export default App;
