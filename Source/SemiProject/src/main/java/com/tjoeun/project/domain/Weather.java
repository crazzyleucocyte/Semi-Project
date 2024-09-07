package com.tjoeun.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="WEATHER")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Weather {
	
	@Id
	@Column(name="WTH_ID")
	private Long wthId;
	
//			도시명
	@Column(name="CTY_NM", length=30)
	private String cityName;
	
//			위도
	@Column(name="WTH_LA")
	private Double wthLattd;

//			경도
	@Column(name="WTH_LO")
	private Double wthLongt;
	
//			예보구역코드
	@Column(name="REG_ID", length=10)
	private String regId;
	
	
	
}
