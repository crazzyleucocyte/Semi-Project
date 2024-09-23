package com.tjoeun.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.tjoeun.project.domain.CultureFacility;
import com.tjoeun.project.domain.WalkingTrail;
import com.tjoeun.project.repository.CultureFacilityRepository;

@Service
public class CultureFacilityService {

	@Autowired
	CultureFacilityRepository cultureFacilityRepository;

	public Page<CultureFacility> searchList(PageRequest of) {
		return cultureFacilityRepository.findAll(of);
	}

	public Page<CultureFacility> searchListFcltyNameLike(PageRequest of, String keyWord) {
		return cultureFacilityRepository.findByFcltyNameLike(of, keyWord);
	}

	public Page<CultureFacility> searchListCtgryOneLike(PageRequest of, String keyWord) {
		return cultureFacilityRepository.findByCtgryOneLike(of, keyWord);
	}

	public Page<CultureFacility> searchListCtgryTwoLike(PageRequest of, String keyWord) {
		return cultureFacilityRepository.findByCtgryTwoLike(of, keyWord);
	}

	public Page<CultureFacility> searchListCtprvnNameLike(PageRequest of, String keyWord) {
		return cultureFacilityRepository.findByCtprvnNameLike(of, keyWord);
	}

	public Page<CultureFacility> searchListSignguNameLike(PageRequest of, String keyWord) {
		return cultureFacilityRepository.findBySignguNameLike(of, keyWord);
	}

	public Page<CultureFacility> searchListEntrPetSizeLike(PageRequest of, String keyWord) {
		return cultureFacilityRepository.findByEntrPetSizeLike(of, keyWord);
	}

	public CultureFacility getCultureFacilityById(Long cId) {
		return cultureFacilityRepository.findById(cId).orElseThrow(() -> new RuntimeException("Post not found"));
	}

	public CultureFacility findById(Long no) {
		return cultureFacilityRepository.findById(no).get();
	}

	public CultureFacility save(CultureFacility cultureFacility) {
		return cultureFacilityRepository.save(cultureFacility);
	}

	public List<CultureFacility> findByPicturePath() {
		return cultureFacilityRepository.findByPicturePath();
	}

}
