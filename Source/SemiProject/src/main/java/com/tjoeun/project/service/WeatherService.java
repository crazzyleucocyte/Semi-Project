package com.tjoeun.project.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.project.repository.WeatherRepository;

@Service
public class WeatherService {
	
	@Autowired
	WeatherRepository weatherRepository;

	public List<String> findRegId(double la, double lo) {
		
		return weatherRepository.findRegIdByLaLo(la,lo);
	}

	public List<Map<String, Object>> findByCtprvnNm(String ctprvnNm, String signguNm) {
		// TODO Auto-generated method stub
		return weatherRepository.findByCtprvnNm(ctprvnNm, signguNm);
	}
//	public Map<String, Object> findBySignguNm(String signguNm) {
//		// TODO Auto-generated method stub
//		return weatherRepository.findBySignguNm(signguNm);
//	}

}
