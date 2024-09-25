package com.tjoeun.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.project.domain.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByNo(Long id);

	@Query(value = "select * from REVIEW where R_ID = :rid and NO = :no", nativeQuery=true)
	Optional<Review> findByRIdAndNo(@Param(value="rid") String rid,@Param(value="no") Long no);

	@Query(value = "select * from REVIEW where R_ID = :userId order by CREATE_DATE desc", nativeQuery=true)
	List<Review> findAllById(@Param(value="userId") String userId);
	

}
