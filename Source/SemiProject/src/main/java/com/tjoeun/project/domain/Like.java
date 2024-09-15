package com.tjoeun.project.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name="TB_LIKE")
@NoArgsConstructor
@AllArgsConstructor
public class Like {

	@Id
	@Column(name="L_ID", length=20)
	private String lid;
	

	@Id
	@Column(name="NO")
	private Long no;
	
	@CreatedDate
	@Column(name="LikeDate", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime likeDate;
	
}
