package com.tjoeun.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.project.domain.CultureFacility;
import com.tjoeun.project.domain.WalkingTrail;
import com.tjoeun.project.service.CultureFacilityService;
import com.tjoeun.project.service.LikeService;
import com.tjoeun.project.service.WalkingTrailService;

@RestController
@RequestMapping("/api")
public class LikeController {
	
	@Autowired
	LikeService likeService;
	
	@Autowired
	WalkingTrailService walkingTrailService;
	
	@Autowired
	CultureFacilityService cultureFacilityService;
	
//	@PostMapping("/like")
//	public ResponseEntity<Boolean> toggleLike(@RequestBody Map<String, Object> boardInfo) {
//		System.out.println("boardInfo.get(\"lId\") : "+boardInfo.get("lId"));
//		System.out.println("boardInfo.get(\"no\") : "+boardInfo.get("no"));
//        boolean isLiked = likeService.toggleLike(String.valueOf(boardInfo.get("lId")), Long.parseLong(String.valueOf(boardInfo.get("no"))));
//        return ResponseEntity.ok(isLiked);
//    }
	
	@PostMapping("/like")
	public ResponseEntity<?> toggleLike(@RequestBody Map<String, Object> boardInfo) {
	    try {
	        String lId = String.valueOf(boardInfo.get("lId"));
	        Long no = Long.parseLong(String.valueOf(boardInfo.get("no")));
	        
	        if (no > 20000) {
	            WalkingTrail walkingTrail = walkingTrailService.findById(no);
	            if (walkingTrail == null) {
	                return ResponseEntity.notFound().build();
	            }
	            
	            boolean currentLikeStatus = likeService.isLiked(lId, no);
	            if (currentLikeStatus) {
	                walkingTrail.setLikeCount(walkingTrail.getLikeCount() - 1);
	                likeService.deleteLike(lId, no);
	            } else {
	                walkingTrail.setLikeCount(walkingTrail.getLikeCount() + 1);
	                likeService.addLike(lId, no);
	            }
	            walkingTrailService.save(walkingTrail);
	        } else {
	        	CultureFacility cultureFacility = cultureFacilityService.findById(no);
	            if (cultureFacility == null) {
	                return ResponseEntity.notFound().build();
	            }
	            
	            boolean currentLikeStatus = likeService.isLiked(lId, no);
	            if (currentLikeStatus) {
	            	cultureFacility.setLikeCount(cultureFacility.getLikeCount() - 1);
	                likeService.deleteLike(lId, no);
	            } else {
	            	cultureFacility.setLikeCount(cultureFacility.getLikeCount() + 1);
	                likeService.addLike(lId, no);
	            }
	            cultureFacilityService.save(cultureFacility);
	        }

	        // 최종 좋아요 상태를 확인합니다.
	        boolean finalLikeStatus = likeService.isLiked(lId, no);
	        return ResponseEntity.ok(finalLikeStatus);
	    } catch (Exception e) {
	        // 예외가 발생하면 로그를 출력하고 500 에러를 반환합니다.
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("오류 발생: " + e.getMessage());
	    }
	}
	

@PostMapping("/like/status")
	public ResponseEntity<Boolean> getLikeStatus(@RequestBody Map<String, Object> boardInfo) {
		
		//like테이블에 해당 게시물 번호와 사용자 id가 있는지 없는 지 검사
		
		String lId = String.valueOf(boardInfo.get("lId"));
		Long no = Long.parseLong(String.valueOf(boardInfo.get("no")));
		boolean isLiked= false;
		if(no > 20000) {
			//산책로
			isLiked = likeService.isLiked((String)boardInfo.get("lId"), (Long)boardInfo.get("no"));
			if(isLiked/*like테이블에 사용자 아이디와 게시물 아이디가 있는지 없는지*/) {
				//있을때(-1)
				WalkingTrail walkingTrail = walkingTrailService.findById(no);
				walkingTrail.setLikeCount(walkingTrail.getLikeCount() - 1);
				walkingTrailService.save(walkingTrail);
				likeService.deleteLike(lId, no);
				/*
				 * 산책로 객체=산책로 번호로 검색(findById)
				 * 산책로 객체.setLiked(산책로 객체.getLike-1)
				 * walkingTrailRepository.save(산책로 객체)
				 * like테이블 삭제
				 */
			}else {
				//없을떄(+1)
				/*
				 * 산책로 객체=산책로 번호로 검색(findById)
				 * 산책로 객체.setLiked(산책로 객체.getLike+1)
				 * walkingTrailRepository.save(산책로 객체)
				 *  like테이블 삽입
				 */
				WalkingTrail walkingTrail = walkingTrailService.findById(no);
				walkingTrail.setLikeCount(walkingTrail.getLikeCount() + 1);
				walkingTrailService.save(walkingTrail);
				likeService.addLike(lId, no);
			}
		}else {
			//문화시설
			isLiked = likeService.isLiked((String)boardInfo.get("lId"), (Long)boardInfo.get("no"));
			if(isLiked) {
				CultureFacility cultureFacility = cultureFacilityService.findById(no);
				cultureFacility.setLikeCount(cultureFacility.getLikeCount() - 1);
				cultureFacilityService.save(cultureFacility);
				likeService.deleteLike(lId, no);
			}else {
				CultureFacility cultureFacility = cultureFacilityService.findById(no);
				cultureFacility.setLikeCount(cultureFacility.getLikeCount() + 1);
				cultureFacilityService.save(cultureFacility);
				likeService.addLike(lId, no);
			}
		}
		
	    return ResponseEntity.ok(isLiked);
	}
	
}
