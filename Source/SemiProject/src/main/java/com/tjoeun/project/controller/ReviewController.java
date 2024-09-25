package com.tjoeun.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.project.domain.Review;
import com.tjoeun.project.service.CultureFacilityService;
import com.tjoeun.project.service.ReviewService;
import com.tjoeun.project.service.WalkingTrailService;

@RestController
@RequestMapping("/review")
//@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
	
	@Autowired
	ReviewService reviewService;
	
	@Autowired
	CultureFacilityService cultureService;
	
	@Autowired
	WalkingTrailService walkingService;
	
	//리뷰 등록
	@PostMapping("/post")
	private Review postReview(@RequestBody Review newReview){
		
		return reviewService.postReview(newReview);
	}
	
	//리뷰 수정
	@PutMapping("/post")
	private Review updateReview(@RequestBody Review newReview){
		return reviewService.postReview(newReview);
	}
	
	//리뷰 목록 조회
	@GetMapping("/getList/{id}")
	private List<Review> getReviewList(@PathVariable("id") Long no){
		return reviewService.findByNo(no);
	}
	
	//리뷰 수정을 위한 리뷰 조회
	@GetMapping("/get/{id}/{rid}")
	private Review getReview(@PathVariable("id") Long no, @PathVariable("rid") String rid) {
		Optional<Review> result = reviewService.findByRidAndNo(rid,no);
			return result.get();
		
	}
	
	//사용자가 작성한 리뷰 조회
	@GetMapping("/history/{userId}")
	private List<Review> getReviewListById(@PathVariable("userId") String userId){
		List<Review> result = new ArrayList<>();
		List<Review> reviewList = reviewService.findById(userId);
		for(Review review : reviewList) {
			if(review.getNo()>200000) {
				String name = cultureService.findById(review.getNo()).getFcltyName();
				review.setName(name);
				result.add(review);
			}else {
				String name = walkingService.findById(review.getNo()).getWlktrlName();
				review.setName(name);
				result.add(review);
			}
		}
		
		return reviewList;
		
	}
	
	//리뷰 삭제
	@DeleteMapping("/delete/{id}/{rid}")
	private String deleteReview(@PathVariable("id") Long no, @PathVariable("rid") String rid){
		
		System.out.println("no : "+no+", rid : "+rid);
		Review result = reviewService.findByRidAndNo(rid,no).get();
		reviewService.delete(result);
		return rid;
	}
	
	
	
	
	
	
}
