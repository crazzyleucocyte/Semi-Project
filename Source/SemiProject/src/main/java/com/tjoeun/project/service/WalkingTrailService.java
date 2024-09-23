package com.tjoeun.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tjoeun.project.domain.WalkingTrail;
import com.tjoeun.project.repository.WalkingTrailRepository;

@Service
public class WalkingTrailService {
	
	@Autowired
	WalkingTrailRepository walkingTrailRepository;
	
//	public List<WalkingTrail> getAllWalkingTrails() {
//		return walkingTrailRepository.findAll();
//	}

//	public List<WalkingTrail> getAllWalkingList(int startNum, int endNum) {
//		return walkingTrailRepository.getAllWalkingList(startNum, endNum);
//		
//	}

//	public Page<WalkingTrail> getAllWalkingListById(String keyWord, int page, int numPerPage) {
//		
//		return walkingTrailRepository.getAllWalkingListById();
//	}

	public Page<WalkingTrail> serchtListIdLike(PageRequest of, String keyWord) {
		return walkingTrailRepository.findByWIdLike(of, keyWord);
	}


	public Page<WalkingTrail> serchtList(PageRequest of) {
		return walkingTrailRepository.findAll(of);
	}


	public Page<WalkingTrail> serchtListWlktrlNameLike(PageRequest of, String keyWord) {
		return walkingTrailRepository.findByWlktrlNameLike(of, keyWord);
	}


	public Page<WalkingTrail> serchtListCoursLvNmLike(PageRequest of, String keyWord) {
		return walkingTrailRepository.findByCoursLvNmLike(of, keyWord);
	}


	public Page<WalkingTrail> serchtListCoursTmContentLike(PageRequest of, String keyWord) {
		return walkingTrailRepository.findByCoursTmContentLike(of, keyWord);
	}


	public Page<WalkingTrail> serchtListSignguNmLike(PageRequest of, String keyWord) {
		return walkingTrailRepository.findBySignguNmLike(of, keyWord);
	}


	public WalkingTrail getWalkingTrailById(Long wId) {
		return walkingTrailRepository.findById(wId).orElseThrow(() -> new RuntimeException("Post not found"));
	}


	public WalkingTrail findById(Long no) {
		return walkingTrailRepository.findById(no).orElseThrow(() -> new RuntimeException("Post not found"));
	}


	public WalkingTrail save(WalkingTrail walkingTrail) {
		return walkingTrailRepository.save(walkingTrail);
	}

	}