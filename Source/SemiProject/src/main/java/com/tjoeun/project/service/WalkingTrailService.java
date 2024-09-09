package com.tjoeun.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
		return walkingTrailRepository.findByWlktrlNameLike(of, keyWord);
	}


	public Page<WalkingTrail> serchtListCoursTmContentLike(PageRequest of, String keyWord) {
		return walkingTrailRepository.findByWlktrlNameLike(of, keyWord);
	}


	public Page<WalkingTrail> serchtListsignguNmLike(PageRequest of, String keyWord) {
		return walkingTrailRepository.findByWlktrlNameLike(of, keyWord);
	}

	
	
	
}
