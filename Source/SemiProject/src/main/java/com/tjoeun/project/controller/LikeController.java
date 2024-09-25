package com.tjoeun.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.project.domain.CultureFacility;
import com.tjoeun.project.domain.Like;
import com.tjoeun.project.domain.Review;
import com.tjoeun.project.domain.WalkingTrail;
import com.tjoeun.project.service.CultureFacilityService;
import com.tjoeun.project.service.LikeService;
import com.tjoeun.project.service.WalkingTrailService;

@RestController
@RequestMapping("/like")
public class LikeController {
	
	@Autowired
	LikeService likeService;
	
	@Autowired
	WalkingTrailService walkingTrailService;
	
	@Autowired
	CultureFacilityService cultureFacilityService;
	
	@PostMapping("/toggle")
	public ResponseEntity<?> toggleLike(@RequestBody Map<String, Object> boardInfo) {
	    try {
	    	System.out.println("boardInfo : "+ boardInfo);
	        String lId = String.valueOf(boardInfo.get("lId"));
	        Long no = Long.parseLong(String.valueOf(boardInfo.get("no")));
	        System.out.println("1. no : " + no);
	        
	        boolean isWalkingTrail = no < 200000;
	        boolean currentLikeStatus;
	        int newLikeCount;

	        if (isWalkingTrail) {
	            WalkingTrail walkingTrail = walkingTrailService.findById(no);
	            if (walkingTrail == null) {
	                return ResponseEntity.notFound().build();
	            }
	            
	            currentLikeStatus = likeService.isLiked(lId, no);
	            newLikeCount = toggleLikeStatus(currentLikeStatus, walkingTrail, lId, no);
	            walkingTrailService.save(walkingTrail);
	        } else {
	            CultureFacility cultureFacility = cultureFacilityService.findById(no);
	            if (cultureFacility == null) {
	                return ResponseEntity.notFound().build();
	            }
	            
	            currentLikeStatus = likeService.isLiked(lId, no);
	            newLikeCount = toggleLikeStatus(currentLikeStatus, cultureFacility, lId, no);
	            cultureFacilityService.save(cultureFacility);
	        }

	        Map<String, Object> response = new HashMap<>();
	        response.put("isLiked", !currentLikeStatus);
	        response.put("likeCount", newLikeCount);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("오류 발생: " + e.getMessage());
	    }
	}

	private int toggleLikeStatus(boolean currentLikeStatus, Object entity, String lId, Long no) {
	    int newLikeCount;
	    if (currentLikeStatus) {
	        newLikeCount = getLikeCount(entity) - 1;
	        setLikeCount(entity, newLikeCount);
	        Like likeObj = likeService.findByIdAndNo(lId, no).orElseThrow(() -> new RuntimeException("Like object not found"));
	        likeService.deleteLike(likeObj);
	    } else {
	        newLikeCount = getLikeCount(entity) + 1;
	        setLikeCount(entity, newLikeCount);
	        Like likeObj = new Like().builder()
	                                 .lid(lId)
	                                 .no(no)
	                                 .build();
	        likeService.addLike(likeObj);
	    }
	    return newLikeCount;
	}

	private int getLikeCount(Object entity) {
	    if (entity instanceof WalkingTrail) {
	        return ((WalkingTrail) entity).getLikeCount();
	    } else if (entity instanceof CultureFacility) {
	        return ((CultureFacility) entity).getLikeCount();
	    }
	    throw new IllegalArgumentException("Unsupported entity type");
	}

	private void setLikeCount(Object entity, int count) {
	    if (entity instanceof WalkingTrail) {
	        ((WalkingTrail) entity).setLikeCount(count);
	    } else if (entity instanceof CultureFacility) {
	        ((CultureFacility) entity).setLikeCount(count);
	    } else {
	        throw new IllegalArgumentException("Unsupported entity type");
	    }
	}
	
	

	@PostMapping("/status")
	public ResponseEntity<Boolean> getLikeStatus(@RequestBody Map<String, Object> boardInfo) {
		String lId = String.valueOf(boardInfo.get("lId"));
		Long no = Long.parseLong(String.valueOf(boardInfo.get("no")));
		/*
			user가 like를 누른 상태를 저장해서 그 값을 boolean으로 불러오는 것
		*/
		boolean isLiked= likeService.isLiked(lId, no);
	    return ResponseEntity.ok(isLiked);
	}
	
	@GetMapping("/history/{lId}")
	private List<Like> getLikeHistory(@PathVariable("lId") String lId){
		List<Like> result = new ArrayList<>();
		List<Like> likeList = likeService.findById(lId);
		for(Like like : likeList) {
			if(like.getNo()>200000) {
				String name = cultureFacilityService.findById(like.getNo()).getFcltyName();
				like.setName(name);
				result.add(like);
			}else {
				String name = walkingTrailService.findById(like.getNo()).getWlktrlName();
				like.setName(name);
				result.add(like);
			}
		}
		
		return likeList;
	}	
	
}
