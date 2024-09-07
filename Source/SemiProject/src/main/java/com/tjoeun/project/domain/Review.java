package com.tjoeun.project.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name="REVIEW")
@NoArgsConstructor
@AllArgsConstructor
public class Review {
	
	@Id
	@Column(name="R_ID", length=20)
	private String rId;

	@Id
	@Column(name="NO")
	private Long no;
	
	@Column(name="PHOTO_NM")
	private List<String> photoName;
	
	@Column(name="PHOTO_PT")
	private List<String> photoPath;
	
	
	@CreatedDate
	@Column(name="LikeDate", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime likeDate;

}
