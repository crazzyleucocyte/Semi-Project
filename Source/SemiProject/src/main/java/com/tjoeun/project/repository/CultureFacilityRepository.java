package com.tjoeun.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tjoeun.project.domain.CultureFacility;

public interface CultureFacilityRepository extends JpaRepository<CultureFacility, Long> {

	Page<CultureFacility> findAll(Pageable pageable);

	Page<CultureFacility> findByFcltyNameLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByCtgryOneLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByCtgryTwoLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByCtprvnNameLike(PageRequest of, String keyWord);

	Page<CultureFacility> findBySignguNameLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByEntrPetSizeLike(PageRequest of, String keyWord);
	
	@Query(value="select * from CULTURE_FCLT where PICTURE_PT is not null order by LIKE_CT desc", nativeQuery=true)
	List<CultureFacility> findByPicturePath();


}
