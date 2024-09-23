package com.tjoeun.project.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.project.domain.Review;
import com.tjoeun.project.service.ReviewService;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
	
	@Autowired
	ReviewService reviewService;
	
	@PostMapping("/post")
	private Review postReview(@RequestBody Review newReview){
		
		return reviewService.postReview(newReview);
	}
	@PutMapping("/post")
	private Review updateReview(@RequestBody Review newReview){
		return reviewService.postReview(newReview);
	}
	
	@GetMapping("/getList/{id}")
	private List<Review> getReviewList(@PathVariable("id") Long no){
		return reviewService.findById(no);
	}
	
	@GetMapping("/get/{id}/{rid}")
	private Review getReview(@PathVariable("id") Long no, @PathVariable("rid") String rid) {
		Optional<Review> result = reviewService.findByRidAndNo(rid,no);
			return result.get();
		
	}
	
}
