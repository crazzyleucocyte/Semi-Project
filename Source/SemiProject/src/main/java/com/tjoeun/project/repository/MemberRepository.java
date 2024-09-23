package com.tjoeun.project.repository;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tjoeun.project.domain.Member;

@Repository
public interface  MemberRepository extends  JpaRepository<Member, String> {

	Optional<Member> findByIdAndPwd(String id, String pwd);

	Optional<Member> findById(String id);

	
	   

	


	
	}


