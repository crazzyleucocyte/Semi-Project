package com.tjoeun.project.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Member {
//			사용자 아이디
	@Id
	@Column(name="ID", length=20)
	private String id;
	
//			사용자 비밀번호
	
	@Column(name="PWD", length=30)
	@NonNull
	private String pwd;
	
//			사용자 이름
	@NonNull
	@Column(name="name", length=20)
	private String name;
	
//			사용자 주민번호
	@Column(name="MEM_SSN",length=13)
	@NonNull
	private String memSsn;

//			사용자 전화번호
	@Column(name="PHONE", length=11)
	@NonNull
	private String phone;

//			사용자 이메일
	@Column(name="EMAIL", length=30)
	private String email;
	
//			사용자 성별(F = 여성, M = 남성, N = 알수없음)
	@Column(name="GENDER", length=1)
	private String gender;
	
//			계정 생성 날짜
	@CreatedDate
	@Column(name="CREATE_DT", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createDate;
	
//			계정 마지막 변경 날짜
	@LastModifiedDate
	@Column(name="MODIFIED_DT", insertable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime modifiedDate;
	
//			삭제 날짜
//			회원 자체를 삭제하려면 nativeQuery로 삭제
	@Column(name = "ISDELETED") 
	private LocalDateTime isDeleted;
	
	
	
	
	
	
	
	
	
	
}
