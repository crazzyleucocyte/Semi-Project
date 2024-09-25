package com.tjoeun.project.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name="TB_LIKE")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(LikeId.class)
public class Like {

	@Id
	@Column(name="L_ID", length=20)
	private String lid;
	
	@Id
	@Column(name="NO")
	private Long no;
	
	@CreatedDate
	@Column(name="LIKEDATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime likeDate;
	
	@Transient
	private String name;
}
