package com.tjoeun.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Member {
	@Id
	@Column(length=20)
	private String id;
	@Id
	private String pwd;
	private String name;
	
}
