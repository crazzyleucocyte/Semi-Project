package com.tjoeun.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.NonNull;

@Entity(name="CITY_DISTRICT")
@Data
public class CityDstrict {
	@Id
	@SequenceGenerator(
			name="CTNO",
			sequenceName = "CT_NO_SEQ",
			allocationSize=1,
			initialValue=1
			)
		@GeneratedValue(generator="CTNO")
	private Long CtNo;
	
	@NonNull
	@Column(name="CTPRVN_NM", length=30, nullable = false)
	private String ctprvnNm;
	
	@Column(name="SIGNGU_NM", length=50)
	private String signguNm;
	
	//	위도(Latitude)
	@Column(name="LC_LA", nullable=false, length=20)
	@NonNull
	private Double lcLattd;
	
	//	경도(Longitude)
	@Column(name="LC_LO", nullable=false, length=20)
	@NonNull
	private Double lcLongt;

	
	
}
