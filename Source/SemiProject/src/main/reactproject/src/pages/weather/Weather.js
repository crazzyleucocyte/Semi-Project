import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import AreaSelector from "../../components/AreaSelector";
import '../../assets/Weather.css'

export default function Weather() {
    let reduxs = useSelector(state => state.CityInfo)
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    //const [Data, setData] = useState(testdata)
    const [cityInfo, setCityInfo] = useState(reduxs);
    const [midWeather, setMidWeather] = useState([]);
    const [shortWeather, setShortWeather] = useState([]);

    const handleSetcityInfo = (newcityInfo) => {
        setCityInfo(prevCityInfo => ({
            ...prevCityInfo,
            ...newcityInfo
        }));
    };

    useEffect(() => {
        console.log("Effect reduxs : ", reduxs)

        Caller()

    }, [cityInfo])


    useEffect(() => {
        console.log(loading)
    }, [loading])


    const Caller = function () {
        setLoading(true)
        console.log("cityInfo : ", cityInfo)
        console.log("reduxs : ", reduxs)
        axios.post('/api/weather', cityInfo)
            .then(({ data }) => {
                console.log('data', data)
                try {
                    setMidWeather([...data.midResult])
                    setShortWeather([...data.shortResult])
                } catch (error) {
                    console.log(error)
                }

                console.log("midWeather ", midWeather)
                setLoading(false)
                // console.log("shortWeather ",shortWeather)
            })
            .catch((error) => {
                window.alert(error)
            })

    }
    //없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
    const skyImg = ['', process.env.PUBLIC_URL + "/img/weather/sun.png", '', process.env.PUBLIC_URL + "/img/weather/cloudy.png", process.env.PUBLIC_URL + "/img/weather/cloud.png"]
    const ptyImg = ['', process.env.PUBLIC_URL + "/img/weather/rainy.png", process.env.PUBLIC_URL + "/img/weather/rainy.png", process.env.PUBLIC_URL + "/img/weather/snowy.png", process.env.PUBLIC_URL + "/img/weather/storm.png"];
    const divStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/weather/weatherBackImg.jpg)`,
        backgroundSize: "cover", // 이미지를 전체 배경으로 설정

    };

    let toDay = '';
    if (shortWeather.length != 0) {
        toDay = shortWeather[0].fcstDate.substr(4, 4)
    }

    const leftMidWeather = midWeather.filter((value, i) => {
        return i < 4;
    })
    const rightMidWeather = midWeather.filter((value, i) => {
        return i >= 4;
    })

    console.log("leftMidWeather : ", leftMidWeather)
    console.log("rightMidWeather : ", rightMidWeather)

    const scrollContainerRef = useRef(null); // 스크롤 컨테이너를 참조하기 위한 useRef 훅

    useEffect(() => {
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
    })

    return (
        <>
            {loading ? <div className="loadingDiv" ><img className="loadingImg" src={process.env.PUBLIC_URL + '/img/loading.gif'} /><span>로딩중...</span></div> : ''}
            <br /><br />
            <div className="weatherBody">

                <div className="areaSelectorDiv">
                    <AreaSelector handleSetcityInfo={handleSetcityInfo} /><br />
                    <h1>{cityInfo.ctprvnNm} {cityInfo.signguNm}의 날씨</h1>
                </div>
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
                                            <span className="tmpPop">
                                                <span>&ensp;&ensp;기온&ensp;&ensp;강수확률</span>
                                                <br/>
                                                {value.tmpValue}°C&ensp;/&ensp;{value.popValue}%
                                            </span>&emsp;
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mid">

                        <div className="mid-block">
                            <div className="mid-table-head">
                                <span>월 / 일</span>&emsp;
                                <span>최저 기온 / 최고 기온</span>&emsp;
                                <span>오전 강수 / 오후 강수</span>&emsp;
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span>오전 / 오후</span>&emsp;
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                            {leftMidWeather.map((value, i) => {
                                console.log(value)
                                let day = addDaysToDate(toDay, value.day)
                                return (
                                    <div className="mid-item">
                                        <span className="midDay">{day}</span>&emsp;
                                        <span className="midTmp" >
                                            <span id="min">{value.min}°C</span>
                                            &ensp;/&ensp;
                                            <span id="max">{value.max}°C</span>
                                        </span>&emsp;
                                        <span className="midrnSt">
                                            {value.rnStAM}%
                                            &ensp;/&ensp;
                                            {value.rnStPM}%
                                        </span>&emsp;
                                        <span className="midImgDiv"><img className="midImg" src={midWf(value.wfPM)} /></span>&emsp;
                                        <span className="midImgDiv"><img className="midImg" src={midWf(value.wfAM)} /></span>&emsp;
                                    </div>
                                )
                            })}

                        </div>
                        <span className="outLine">
                            <p className="line"> </p>
                        </span>
                        <div className="mid-block">
                            <div className="mid-table-head">
                                <span>월 / 일</span>&emsp;
                                <span>최저 기온 / 최고 기온</span>&emsp;
                                <span>오전 강수 / 오후 강수</span>&emsp;
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span>오전 / 오후</span>&emsp;
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>
                            {rightMidWeather.map((value, i) => {
                                console.log(value)
                                let day = addDaysToDate(toDay, value.day)
                                if (value.day < 8) {

                                    return (

                                        <div className="mid-item">
                                            <span className="midDay">{day}</span>&emsp;
                                            <span className="midTmp" >
                                                <span id="min">{value.min}°C</span>
                                                &ensp;/&ensp;
                                                <span id="max">{value.max}°C</span>
                                            </span>&emsp;
                                            {/* <span className="midTmp" id = "max">{value.max}°C</span>&emsp; */}
                                            <span className="midrnSt">
                                                {value.rnStAM}%
                                                &ensp;/&ensp;
                                                {value.rnStPM}%
                                            </span>&emsp;
                                            <span className="midImgDiv"><img className="midImg" src={midWf(value.wfPM)} /></span>&emsp;
                                            <span className="midImgDiv"><img className="midImg" src={midWf(value.wfAM)} /></span>&emsp;
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="mid-item">
                                            <span className="midDay">{day}</span>&emsp;
                                            <span className="midTmp" >
                                                <span id="min">{value.min}°C</span>
                                                &ensp;/&ensp;
                                                <span id="max">{value.max}°C</span>
                                            </span>&emsp;&emsp;&emsp;&emsp;
                                            {/* <span className="midTmp" id = "max">{value.max}°C</span>&emsp; */}
                                            <span className="midrnSt">
                                                &ensp;
                                                {value.rnSt}%
                                                &ensp;
                                            </span>&emsp;&emsp;&emsp;&ensp;
                                            <span className="midImgDiv"><img className="midImg" src={midWf(value.wf)} /></span>&emsp;&emsp;&emsp;
                                            {/* <span className="midImgDiv"><img className="midImg" src={midWf(value.wfAM)}/></span>&emsp; */}
                                        </div>
                                    )

                                }
                            })}

                        </div>
                    </div>

                </div>

            </div>
        </>
    );

    function midWf(wfData) {
        let result;
        // wf에 따라 사진 배정
        {/* - 맑음
        - 구름많음, 구름많고 비, 구름많고 눈, 구름많고 비/눈, 구름많고 소나기
        - 흐림, 흐리고 비, 흐리고 눈, 흐리고 비/눈, 흐리고 소나기 */}
        switch (wfData) {
            case '맑음':
                result = process.env.PUBLIC_URL + "/img/weather/sun.png"
                break;
            case '구름많음':
            case '흐림':
                result = process.env.PUBLIC_URL + "/img/weather/cloudy.png"
            case '구름많고 비':
            case '흐리고 비':
            case '구름많고 비/눈':
            case '흐리고 비/눈':
                result = process.env.PUBLIC_URL + "/img/weather/rainy.png"
                break;
            case '구름많고 눈':
            case '흐리고 눈':
                result = process.env.PUBLIC_URL + "/img/weather/snowy.png"
                break;
            case '구름많고 소나기':
            case '흐리고 소나기':
                result = process.env.PUBLIC_URL + "/img/weather/storm.png"
                break;
        }

        return result;
    }

    function addDaysToDate(mmdd, n) {
        // MMDD 문자열을 월과 일로 분리
        const month = parseInt(mmdd.toString().slice(0, 2), 10); // 앞의 두 글자를 월로 사용
        const day = parseInt(mmdd.toString().slice(2), 10); // 뒤의 두 글자를 일로 사용

        // 현재 연도의 해당 월, 일을 기준으로 Date 객체 생성
        const currentYear = new Date().getFullYear(); // 현재 연도
        const date = new Date(currentYear, month - 1, day); // 월은 0부터 시작하므로 -1을 함

        // n일 추가
        date.setDate(date.getDate() + n);

        // 결과 날짜의 월과 일을 얻음
        const newMonth = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리 형식으로
        const newDay = date.getDate().toString().padStart(2, "0"); // 두 자리 형식으로

        // MMDD 형식으로 반환
        return `${newMonth} / ${newDay}`;
    }
}