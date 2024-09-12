package com.tjoeun.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.project.domain.CultureFacility;

public interface CultureFacilityRepository extends JpaRepository<CultureFacility, Long> {

	Page<CultureFacility> findAll(Pageable pageable);

	Page<CultureFacility> findByFcltyNameLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByCtgryOneLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByCtgryTwoLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByCtprvnNameLike(PageRequest of, String keyWord);

	Page<CultureFacility> findBySignguNameLike(PageRequest of, String keyWord);

	Page<CultureFacility> findByEntrPetSizeLike(PageRequest of, String keyWord);

}
