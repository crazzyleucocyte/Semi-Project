package com.tjoeun.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tjoeun.project.domain.Like;
import com.tjoeun.project.domain.LikeId;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
	boolean existsByLidAndNo(String lid, Long no);

	void deleteByLidAndNo(String lid, Long no);
}
