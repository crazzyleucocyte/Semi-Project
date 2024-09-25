package com.tjoeun.project.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity(name="REVIEW")
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ReviewId.class)
@ToString
public class Review {
	
	@Id
	@Column(name="R_ID", length=20)
	private String rId;

	@Id
	@Column(name="NO")
	private Long no;
		
	@Column(name="RV_CN", length=4000)
	private String content;
	
	@CreatedDate
	@Column(name="CREATE_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createDate;
	
	@Transient
	private String name;

}
