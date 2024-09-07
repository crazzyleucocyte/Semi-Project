package com.tjoeun.project.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity(name="TERMS_HISTORY")
public class TermsHistory {
	
//			회원의 id
	@Id
	@Column(name="ID" )
	private Long mID;
	
//			약관 코드
	@Id
	@Column(name="TRM_CD")
	private String trmCode;
	
//			약관 동의 여부
	@Column(name="AGR_YN")
	private char agreeYN;
	
//			약관 동의 날짜
	@Column(name="AGR_DT")
	private LocalDateTime agreeDate;
	
}
