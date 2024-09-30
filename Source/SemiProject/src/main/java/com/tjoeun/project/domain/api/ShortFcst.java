package com.tjoeun.project.domain.api;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ShortFcst {

	
	
	private String fcstDate;
	private String fcstTime;
	private String tmpValue;
	private String popValue;
	private String skyValue;
	private String ptyValue;

    


}
//단기예보 결과를 insert하는거 테스트 중