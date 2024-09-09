package com.tjoeun.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.project.domain.WalkingTrail;

@Repository
public interface WalkingTrailRepository extends JpaRepository<WalkingTrail, Long> {

	Page<WalkingTrail> findByWIdLike(PageRequest of, String keyWord);

	Page<WalkingTrail> findByWlktrlNameLike(PageRequest of, String keyWord);
	
//	Page<WalkingTrail> findByWriterLike(PageRequest of, String keyWord);
//
//	Page<WalkingTrail> findByContentLike(PageRequest of, String keyWord);

}