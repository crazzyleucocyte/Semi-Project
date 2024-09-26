import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCityInfo } from '../hooks/store';

const AreaSelector = ({ handleSetcityInfo}) => {
  // 상태 관리
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const dispatch =useDispatch()

  useEffect(()=>{
      console.log(dispatch(setCityInfo()))
      console.log("selectedProvince : ", selectedProvince)
      console.log("selectedCity : ", selectedCity)
    },[selectedCity])
  // 시/도와 시/군/구 데이터 매핑
  const data = {
    "강원도": ["양구군", "속초시", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군", "고성군", "동해시", "삼척시", "양양군"],
    "경기도": ["수원시팔달구", "시흥시", "안산시단원구", "안산시상록구", "안성시", "안양시동안구", "안양시만안구", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시기흥구", "용인시수지구", "용인시처인구", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "김포시", "남양주시", "동두천시", "부천시소사구", "부천시오정구", "부천시원미구", "성남시분당구", "성남시수정구", "성남시중원구", "수원시권선구", "수원시영통구", "수원시장안구"],
    "경상남도": ["밀양시", "남해군", "사천시", "산청군", "창원시성산구", "합천군", "의령군", "하동군", "창원시마산합포구", "창녕군", "통영시", "진주시", "양산시", "함안군"],
    "경상북도": ["김천시", "포항시북구", "성주군", "칠곡군", "청송군", "청도군", "의성군", "울진군", "울릉군", "예천군", "영천시", "영주시", "영양군", "영덕군", "안동시", "포항시남구", "상주시", "봉화군", "문경시"],
    "광주광역시": ["북구", "남구", "서구", "동구"],
    "대구광역시": ["중구", "남구", "수성구", "동구", "북구", "서구", "달서구"],
    "대전광역시": ["중구", "대덕구", "동구", "서구", "유성구"],
    "부산광역시": ["중구", "해운대구", "금정구", "기장군", "남구", "동구", "영도구", "부산진구", "북구", "사상구", "사하구", "서구", "연제구", "동래구"],
    "서울특별시": ["서대문구", "서초구", "마포구", "동작구", "동대문구", "도봉구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구", "금천구", "노원구"],
    "세종특별자치시": ["세종특별자치시"],
    "울산광역시": ["동구", "중구", "울주군", "북구"],
    "인천광역시": ["서구", "연수구", "옹진군", "중구", "남동구", "미추홀구", "부평구"],
    "전라남도": ["화순군", "나주시", "신안군", "순천시", "담양군", "진도군", "목포시", "무안군", "장흥군", "장성군", "완도군", "보성군", "영암군", "여수시", "함평군", "해남군", "영광군"],
    "전라북도": ["남원시", "익산시", "무주군", "완주군", "진안군", "임실군", "김제시", "장수군", "순창군", "정읍시", "부안군", "고창군", "전주시완산구", "전주시덕진구"],
    "제주특별자치도": ["서귀포시", "제주시"],
    "충청남도": ["홍성군", "태안군", "청양군", "천안시서북구", "천안시동남구", "예산군", "아산시", "부여군", "서산시", "보령시", "당진시", "논산시", "금산군"],
    "충청북도": ["청주시상당구", "옥천군", "단양군", "진천군", "보은군", "증평군", "충주시", "음성군", "청주시서원구", "청주시청원구", "청주시흥덕구", "영동군", "제천시"]
};


  // 시/도 선택 변경 핸들러
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedCity(''); // 시/도 변경 시 시/군/구 초기화
  };

  // 시/군/구 선택 변경 핸들러
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const searchWeatherByCity = (e)=>{
    e.preventDefault();
    axios.get(`/api/weather/${selectedProvince}/${selectedCity}`)
         .then(({data})=>{
            console.log("data : ", data)
            dispatch(setCityInfo(data))
            handleSetcityInfo(data)
         })

  }

  return (
    <div>
      {/* 첫 번째 선택 필드 */}
      <select name="ctprvnNm" id="postsPerPageSelect"  onChange={handleProvinceChange}>
        <option value="">-- 시/도 선택 --</option>
        {Object.keys(data).map((province) => (
          <option key={province} value={province}>{province}</option>
        ))}
      </select>
        &emsp;
      {/* 두 번째 선택 필드 */}
      <select name="signguNm" id="postsPerPageSelect"  value={selectedCity} onChange={handleCityChange} disabled={!selectedProvince}>
        <option value="">-- 시/군/구 선택 --</option>
        {selectedProvince && data[selectedProvince].map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      &emsp;
        <button onClick={searchWeatherByCity} className="button-detail">검색</button>

    </div>
  );
};

export default AreaSelector;
