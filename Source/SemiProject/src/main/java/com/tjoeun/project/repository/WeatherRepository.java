package com.tjoeun.project.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.project.domain.Weather;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long> {

	@Query(value="select REG_ID from WEATHER where WTH_LA <= (:la+0.08) and WTH_LA >= (:la-0.08) and  WTH_LO <= (:lo+0.08) and WTH_LO >= (:lo-0.08) ",nativeQuery=true)
	List<String> findRegIdByLaLo(@Param(value="la") double la, @Param(value="lo")double lo);

	
	@Query(value="select LC_LA, LC_LO from CITY_DISTRICT where CTPRVN_NM = :ctprvnNm and SIGNGU_NM = :signguNm",nativeQuery=true)
	List<Map<String, Object>> findByCtprvnNm(@Param(value="ctprvnNm")String ctprvnNm, @Param(value="signguNm")String signguNm); 

	static Map<String, Object> findBySignguNm(String signguNm) {
		// TODO Auto-generated method stub
		return null;
	}

}
