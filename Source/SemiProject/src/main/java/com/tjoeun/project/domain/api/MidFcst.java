package com.tjoeun.project.domain.api;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class MidFcst {
	
	private int day;
	private int min;
	private int max;
	
	private String wfAM;
	private String wfPM;
	private String rnStAM;
	private String rnStPM;
	private String regId;
	private String wf;
	private String rnSt;
	
	
	public MidFcst(String regId) {
		super();
		this.regId = regId;
	}
	
	

}
