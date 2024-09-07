package com.tjoeun.project.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity(name="admin")
public class Admin {
	
	@Id
	@Column(name="A_ID", length=30)
	private String AId;
	
	@Column(name="A_PWD", length=30)
	private String APwd;
	
	@CreatedDate
	@Column(name="A_CREATE_DT", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime aCreateDate;
	
}
