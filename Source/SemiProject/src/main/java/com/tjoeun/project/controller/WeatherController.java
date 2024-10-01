package com.tjoeun.project.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tjoeun.project.domain.api.LatXLonY;
import com.tjoeun.project.domain.api.MidFcst;
import com.tjoeun.project.domain.api.ShortFcst;
import com.tjoeun.project.service.WeatherService;

@RestController
public class WeatherController{

	@Autowired
	WeatherService weatherService;

	@Autowired
	LatXLonY latXLonY;
	
	@GetMapping("/api/weather/{ctprvnNm}/{signguNm}")
	public Map<String, String> searchWeather (@PathVariable(name="ctprvnNm") String ctprvnNm, @PathVariable(name="signguNm") String signguNm){
		
		List<Map<String, Object>> queryResult = weatherService.findByCtprvnNm(ctprvnNm, signguNm);
		Map<String, Object> tmp = queryResult.get(0);
		Map<String, String> cityInfo = new HashMap<String,String>();
		cityInfo.put("la", String.valueOf(tmp.get("lc_la")));
		cityInfo.put("lo", String.valueOf(tmp.get("lc_lo")));
		cityInfo.put("ctprvnNm",ctprvnNm);
		cityInfo.put("signguNm", signguNm);
		//System.out.println(tmp);
//		Map<String, Object>result = midFcst(cityInfo);
		return cityInfo;
	}
	
	
	
	@PostMapping("/api/weather")
	public Map<String, Object> midFcst(@RequestBody Map<String, String> cityInfo) {
		Map<String, Object> ladMap = null;
		Map<String, Object> tmpMap = null;
		List<ShortFcst> shortResult = null;
		
		Map<String, Object> result = new HashMap<String,Object>();
		
		try {
			shortResult = shortFcst(cityInfo);
			ladMap = midLandFcst(cityInfo);
			tmpMap = midTmpFcst(cityInfo);
		}catch(Exception e) {
			e.printStackTrace();
		}
		List<MidFcst> midResult=new ArrayList<MidFcst>();
		for(int i = 3; i<11;i++) {
//			MidFcst midFcst = new MidFcst();
			
			String min = "taMin" + i;
			String max = "taMax" + i;
			if(i<8) {
				String wfAM = String.valueOf(ladMap.get("wf"+i+"Am"));
				String wfPM = String.valueOf(ladMap.get("wf"+i+"Pm"));
				String rnStAM = String.valueOf(ladMap.get("rnSt"+i+"Am"));
				String rnStPM = String.valueOf(ladMap.get("rnSt"+i+"Pm"));
				
				MidFcst midFcst = MidFcst.builder()
						.day(i)
						.wfAM(wfAM)
						.wfPM(wfPM)
						.rnStAM(rnStAM)
						.rnStPM(rnStPM)
						.min((int)tmpMap.get(min))
						.max((int)tmpMap.get(max))
						.build();
				midResult.add(midFcst);
			}else {
				String wf = String.valueOf(ladMap.get("wf"+i));
				String rnSt = String.valueOf(ladMap.get("rnSt"+i));
				
				MidFcst midFcst = MidFcst.builder()
						.day(i)
						.wf(wf)
						.rnSt(rnSt)
						.min((int)tmpMap.get(min))
						.max((int)tmpMap.get(max))
						.build();
				midResult.add(midFcst);
			}
		}
		
		result.put("shortResult", shortResult);
		result.put("midResult", midResult);
		
		return result;
	}

	//사용자가 시와동을 검색해서 찾을떄는 동으로 먼저 찾고 있으면 바로 호출, 없으면 시로 검색

	@PostMapping("/api/weather/short")
	public List<ShortFcst> shortFcst( Map<String, String> cityInfo) throws IOException {

		LatXLonY latxLony=null;
		int nx = 57;
		int ny = 127;

		if((cityInfo.get("la")) !=null && (cityInfo.get("lo")) != null ) {
			latxLony = ApiService.convertGRID_GPS(Double.parseDouble (cityInfo.get("la")), Double.parseDouble(cityInfo.get("lo")));
		}
		if(latxLony != null) {
			nx = latxLony.getX();
			ny = latxLony.getY();
		}

		//위경도를 xy좌표로

		//호출 날짜를 yyyyMMdd형식으로 
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");
		String baseTime = ApiService.setBaseTime();
		System.out.println("baseTime : "+ baseTime + ", baseDate : "+ format.format(LocalDate.now()));
		List<ShortFcst> vilageFcstList=null;

		StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); /*URL*/
		urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7hTtGR%2FdJRrqCBGXcaViR4T%2FVIlV8qMRTW7q3lGlVOgtgmdj0UUDPlTbN15x%2FbDgpWC%2BYzq4Gcft7Z%2Fk54lLbQ%3D%3D"); /*Service Key*/
		urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
		urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
		urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
		urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(format.format(LocalDate.now()), "UTF-8")); /*‘21년 6월 28일 발표*/
		urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(baseTime, "UTF-8")); /*06시 발표(정시단위) */
		urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(String.valueOf(nx), "UTF-8")); /*예보지점의 X 좌표값*/
		urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(String.valueOf(ny), "UTF-8")); /*예보지점의 Y 좌표값*/
		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		System.out.println("Response code: " + conn.getResponseCode());
		BufferedReader rd;
		if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		} else {
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
		}
		StringBuilder sb = new StringBuilder();
		String line;
		while ((line = rd.readLine()) != null) {
			sb.append(line);
		}
		rd.close();
		conn.disconnect();
//		System.out.println("short : "+sb.toString());
		JSONObject jsonObj=null;
		try {
			JSONParser jsonParser = new JSONParser();
			jsonObj = (JSONObject)jsonParser.parse(sb.toString());
			JSONObject response = (JSONObject) jsonObj.get("response");
			JSONObject body = (JSONObject) response.get("body");
			JSONObject items = (JSONObject) body.get("items");
			JSONArray itemArray = (JSONArray) items.get("item");
			vilageFcstList = new ArrayList<ShortFcst>();
//			System.out.println("shortFcst(179) : "+jsonObj);
			//				itemArray

			for (int i = 0 ; i<itemArray.size();i++ ) {
				//Object itemObject

				JSONObject item = (JSONObject) itemArray.get(i);
				//짝수 시간 체킹
				if(Integer.parseInt(((String)item.get("fcstTime")).substring(0, 2))%2==0)  {

					String evenBaseTime = ((String)item.get("fcstTime")).substring(0, 2);
					//시간대가 변경되면 반복 종료
					ShortFcst vilageFcst = new ShortFcst();
					int j =0;
					//System.out.println("i : " + i);
					for(j = i;
							((String)((JSONObject) itemArray.get(j)).get("fcstTime")).substring(0, 2).equals(evenBaseTime);
							j++) {
						//시간별 강수확률(POP), 하늘 상태(SKY), 기온(TMP), 시간
						if(((String)((JSONObject) itemArray.get(j)).get("category")).equals("TMP")) {
							vilageFcst.setTmpValue((String)(((JSONObject) itemArray.get(j)).get("fcstValue")));
						}
						else if(((String)((JSONObject) itemArray.get(j)).get("category")).equals("SKY")) {
							vilageFcst.setSkyValue((String)(((JSONObject) itemArray.get(j)).get("fcstValue")));
						}
						else if(((String)((JSONObject) itemArray.get(j)).get("category")).equals("POP")) {
							vilageFcst.setPopValue((String)(((JSONObject) itemArray.get(j)).get("fcstValue")));
						}
						else if(((String)((JSONObject) itemArray.get(j)).get("category")).equals("PTY")) {
							vilageFcst.setPtyValue((String)(((JSONObject) itemArray.get(j)).get("fcstValue")));
						}
						vilageFcst.setFcstTime((String)(((JSONObject) itemArray.get(j)).get("fcstTime")));
						vilageFcst.setFcstDate((String)(((JSONObject) itemArray.get(j)).get("fcstDate")));
						// 리스트에 VilageFcst 객체 추가
						i=j;
						if(i==itemArray.size()-1 ) break;
					}
					vilageFcstList.add(vilageFcst);
				}

			}
		}catch (Exception e) {
			e.printStackTrace();
		}



		return vilageFcstList;
	}


	/*
	 * @RequestBody{
	 * 위도(la)
	 * 경도(lo)
	 * 시도명(ctprvnNm)
	 * 시군구명(signguNm)
	 * } 
	 * @Return JSONArray
	 * 
	 */


	public Map<String, Object> midTmpFcst(@RequestBody Map<String, String> cityInfo) {
		System.out.println("midTmpFcst      cityInfo.get(\"la\") : "+ cityInfo.get("la")+ ", cityInfo.get(\"lo\")"+cityInfo.get("lo"));
		Map<String, Object> map = null;
		
		BufferedReader rd=null;
		HttpURLConnection conn=null;
		StringBuilder sb=null;
		try {
			//위도경도로 예보코드 찾기
			List<String> regIdList = weatherService.findRegId(Double.parseDouble(cityInfo.get("la")), Double.parseDouble(cityInfo.get("lo")));
			//여러개를 찾을 수 있기 떄문에 첫번쨰를 가져왔다
//			System.out.println(regIdList.size() == 0);
			String regId = null;
			if (regIdList.size() == 0) {regId = "11B10101";}  //기본값 서울
			else {regId = regIdList.get(0);}
			String tmFc = ApiService.midTmFc(DateTimeFormatter.ofPattern("yyyyMMdd"));
			//String regId = ApiService.getLndRegId(cityInfo.get("ctprvnNm") , cityInfo.get("signguNm"));
			System.out.println("tmFc : " + tmFc + " regId : " + regId);

			StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa");
			urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7hTtGR%2FdJRrqCBGXcaViR4T%2FVIlV8qMRTW7q3lGlVOgtgmdj0UUDPlTbN15x%2FbDgpWC%2BYzq4Gcft7Z%2Fk54lLbQ%3D%3D");

			urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("regId","UTF-8") + "=" + URLEncoder.encode(regId, "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("tmFc","UTF-8") + "=" + URLEncoder.encode(tmFc, "UTF-8"));
			URL url = new URL(urlBuilder.toString());
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");
			System.out.println("Response code: " + conn.getResponseCode());
			if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				rd.close();
				conn.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		System.out.println(sb.toString());
		JSONObject jsonObj=null;
		try {
			org.json.simple.parser.JSONParser jsonParser = new org.json.simple.parser.JSONParser();
			jsonObj = (JSONObject)jsonParser.parse(sb.toString());
			jsonObj = (JSONObject)jsonParser.parse(sb.toString());
			JSONObject response = (JSONObject) jsonObj.get("response");
			JSONObject body = (JSONObject) response.get("body");
			JSONObject items = (JSONObject) body.get("items");
			JSONArray itemArray = (JSONArray) items.get("item");
			
			map = getMapFromJsonObject((JSONObject) itemArray.get(0));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}

	
	
	
//	@PostMapping("/api/test")
	public Map<String,Object> midLandFcst (@RequestBody Map<String, String> cityInfo) {
		System.out.println("cityInfo.get(\"ctprvnNm\") : " + cityInfo.get("ctprvnNm"));
		System.out.println("cityInfo.get(\"signguNm\") : " + cityInfo.get("signguNm"));
		Map<String, Object> map= null;
		
		BufferedReader rd=null;
		HttpURLConnection conn=null;
		StringBuilder sb=null;
		try {
			//위도경도로 예보코드 찾기
			String tmFc = ApiService.midTmFc(DateTimeFormatter.ofPattern("yyyyMMdd"));
			String regId = ApiService.getLndRegId(cityInfo.get("ctprvnNm") , cityInfo.get("signguNm"));
			System.out.println("tmFc : " + tmFc + " regId : " + regId);

			StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst");
			urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7hTtGR%2FdJRrqCBGXcaViR4T%2FVIlV8qMRTW7q3lGlVOgtgmdj0UUDPlTbN15x%2FbDgpWC%2BYzq4Gcft7Z%2Fk54lLbQ%3D%3D");

			urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("regId","UTF-8") + "=" + URLEncoder.encode(regId, "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("tmFc","UTF-8") + "=" + URLEncoder.encode(tmFc, "UTF-8"));
			URL url = new URL(urlBuilder.toString());
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");
			System.out.println("Response code: " + conn.getResponseCode());
			if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				rd.close();
				conn.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
//		System.out.println("midLandFcst : "+ sb.toString());
		JSONObject jsonObj=null;
		try {
			org.json.simple.parser.JSONParser jsonParser = new org.json.simple.parser.JSONParser();
			jsonObj = (JSONObject)jsonParser.parse(sb.toString());
			jsonObj = (JSONObject)jsonParser.parse(sb.toString());
			JSONObject response = (JSONObject) jsonObj.get("response");
			JSONObject body = (JSONObject) response.get("body");
			JSONObject items = (JSONObject) body.get("items");
			JSONArray itemArray = (JSONArray) items.get("item");
			
			map = getMapFromJsonObject((JSONObject) itemArray.get(0));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}


	public static Map<String, Object> getMapFromJsonObject(JSONObject jsonObj){
		Map<String, Object> map = null;

		try {
			map = new ObjectMapper().readValue(jsonObj.toString(), Map.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}



	//	//중기 예보 날짜
	//	@GetMapping("/api/bstm")
	//	public String getTime () {
	//		
	//		return ApiService.midTmFc(format);
	//		
	//	}

}
