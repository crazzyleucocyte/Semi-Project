package com.tjoeun.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.project.domain.WalkingTrail;

@Repository
public interface WalkingTrailRepository extends JpaRepository<WalkingTrail, Long> {

	// 페이징을 위한 메서드 정의
	Page<WalkingTrail> findAll(Pageable pageable);

	Page<WalkingTrail> findByWIdLike(PageRequest of, String keyWord);

	Page<WalkingTrail> findByWlktrlNameLike(PageRequest of, String keyWord);
	
	Page<WalkingTrail> findBySignguNmLike(PageRequest of, String keyWord);

	Page<WalkingTrail> findByCoursLvNmLike(PageRequest of, String keyWord);
	
	Page<WalkingTrail> findByCoursTmContentLike(PageRequest of, String keyWord);
	
	
}
