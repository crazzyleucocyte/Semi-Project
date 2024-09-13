package com.tjoeun.project.repository;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tjoeun.project.domain.Member;

@Repository
public interface  MemberRepository extends  JpaRepository<Member, String> {

	Optional<Member> findByIdAndPwd(String id, String pwd);


	
	}


