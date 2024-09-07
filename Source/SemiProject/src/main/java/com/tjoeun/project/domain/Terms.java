package com.tjoeun.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Terms {
	
//			약관코드(termCode)
	@Id
	@Column(name="TRM_CD", length=2,nullable=false )
	@NonNull
	private String trmCode;
	
//			약관명(ternName)
	@Column(name="TRM_NM", length=20,nullable=false )
	@NonNull
	private String trmName;
	
//			약관내용(termsContent)
	@Column(name="TRM_CN", length=4000,nullable=false )
	@NonNull
	private String trmContent;
	
//			필수여부(termEssentialYorN)
	@Column(name="TRM_ESNTL", length=1,nullable=false )
	@NonNull
	private char trmEssential;
	
}
