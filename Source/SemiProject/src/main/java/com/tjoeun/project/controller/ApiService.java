package com.tjoeun.project.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.tjoeun.project.domain.api.LatXLonY;

public class ApiService {

	public static LatXLonY convertGRID_GPS( double lat_X, double lng_Y) {
		// 위도경도 <--> X, Y좌표 변경을 위한 상수
		double RE = 6371.00877; // 지구 반경(km)
		double GRID = 5.0; // 격자 간격(km)
		double SLAT1 = 30.0; // 투영 위도1(degree)
		double SLAT2 = 60.0; // 투영 위도2(degree)
		double OLON = 126.0; // 기준점 경도(degree)
		double OLAT = 38.0; // 기준점 위도(degree)
		double XO = 43; // 기준점 X좌표(GRID)
		double YO = 136; // 기준점 Y좌표(GRID)

		// LCC DFS 좌표변환 ( code : "TO_GRID"(위경도->좌표, lat_X:위도, lng_Y:경도),
		// "TO_GPS"(좌표->위경도, lat_X:x, lng_Y:y) )

		double DEGRAD = Math.PI / 180.0;
		double RADDEG = 180.0 / Math.PI;

		double re = RE / GRID;
		double slat1 = SLAT1 * DEGRAD;
		double slat2 = SLAT2 * DEGRAD;
		double olon = OLON * DEGRAD;
		double olat = OLAT * DEGRAD;

		double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
		sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
		double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
		sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
		double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
		ro = re * sf / Math.pow(ro, sn);
		LatXLonY rs = new LatXLonY();

		
			rs.la = lat_X;
			rs.lo = lng_Y;
			double ra = Math.tan(Math.PI * 0.25 + (lat_X) * DEGRAD * 0.5);
			ra = re * sf / Math.pow(ra, sn);
			double theta = lng_Y * DEGRAD - olon;
			if (theta > Math.PI)
				theta -= 2.0 * Math.PI;
			if (theta < -Math.PI)
				theta += 2.0 * Math.PI;
			theta *= sn;
			rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
			rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
		
			System.out.println("x : " + rs.getX()+", y : " + rs.getY());

		return rs;
	}
	//단기예보 시간 결정
	public static String setBaseTime() {
		LocalDateTime now = LocalDateTime.now();

		int hour = now.getHour();
		// 예보는 3시간 기점으로 발표
		if (hour < 2) {
			hour = 23;
		} else if (hour < 5) {
			hour = 2;
		} else if (hour < 8) {
			hour = 5;
		} else if (hour < 11) {
			hour = 8;
		} else if (hour < 14) {
			hour = 11;
		} else if (hour < 17) {
			hour = 14;
		} else if (hour < 20) {
			hour = 17;
		} else if (hour < 23) {
			hour = 20;
		} else {
			hour = 23;
		}

		StringBuilder sb = new StringBuilder();
		if (hour < 10) {
			sb.append("0").append(hour);
		} else {
			sb.append(hour);
		}

		sb.append("00");

		return sb.toString();
	}
	
	//중기예보 시간 체크
	public static String midTmFc(DateTimeFormatter format) {
		int hour = LocalDateTime.now().getHour();
		String dateTime = format.format(LocalDateTime.now());
		if (18 <= hour ) {
			dateTime += "1800";
			
		} else if(hour < 6) {
			dateTime=String.valueOf(Integer.parseInt(dateTime)-1);
			dateTime += "1800";

		}else {
			dateTime += "0600";
		}
		return dateTime;
	}
	
	//중기육상 예보구역코드 
		public static String getLndRegId (String ctprvnNm, String signguNm) {
			//시도별로 예보 코드 결정
			switch (ctprvnNm) {
			case "서울특별시":
			case "인천광역시":
			case "경기도":
				return "11B00000";
			case "강원도":
				//영서와 영동 구분
				if(signguNm.contains("춘천") || signguNm.contains("홍천") || signguNm.contains("횡성") || signguNm.contains("영월") || 
						signguNm.contains("평창") || signguNm.contains("정선") || signguNm.contains("철원") || signguNm.contains("화천") || 
						signguNm.contains("양구") || signguNm.contains("인제")) {
					return "11D10000";
				}else return "11D20000";
			case "대전광역시":
			case "세종특별자치시":
			case "충청남도":
				return "11C20000";
			case "충청북도":
				return "11C10000";
			case "광주광역시":
			case "전라남도":
				return "11F20000";
			case "전라북도":
				return "11F10000";
			case "대구광역시":
			case "경상북도":
				return "11H10000";
			case "부산광역시":
			case "울산광역시":
			case "경상남도":
				return "11H20000";
			case "제주특별자치도":
				return "11G00000";
			default:
				//기본값 수도권
				return "11B00000";
			}
			
		}
		
		
}
