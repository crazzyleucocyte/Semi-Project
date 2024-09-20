import { useEffect } from "react";

const { kakao }= window;

function Kakao({ latitude, longitude }) {
    useEffect(() => {
        const container = document.getElementById('map');   // 지도를 담을 DOM 레퍼런스
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);     // 지도 생성 및 객체 리턴

        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 인포윈도우 추가
        // const iwContent = `<div style="padding:5px;">${locationName}</div>`;
        // const infowindow = new kakao.maps.InfoWindow({
        // content : iwContent
        // });
        // infowindow.open(map, marker);

    }, [latitude, longitude])

    return (
        <div id="map" style={{
            width: '800px',
            height: '500px'
        }}></div>
    )
}

export default Kakao;