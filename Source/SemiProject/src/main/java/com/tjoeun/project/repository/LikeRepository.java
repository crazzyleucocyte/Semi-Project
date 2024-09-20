package com.tjoeun.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.project.domain.Like;
import com.tjoeun.project.domain.LikeId;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
	boolean existsByLidAndNo(String lid, Long no);

	Like deleteByLidAndNo(String lid, Long no);


	Optional<Like> findByLidAndNo(String lId, Long no);

}
