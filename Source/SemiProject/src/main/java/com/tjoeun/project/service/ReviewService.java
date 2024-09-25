package com.tjoeun.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.project.domain.Review;
import com.tjoeun.project.repository.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	ReviewRepository reviewRepository;
	
	public Review postReview(Review newReview) {
		return reviewRepository.save(newReview);
	}

	public List<Review> findByNo(Long no) {
		return reviewRepository.findByNo(no);
	}

	public Optional<Review> findByRidAndNo(String rid, Long no) {
		return reviewRepository.findByRIdAndNo(rid,no);
	}

	public List<Review> findById(String userId) {
		return reviewRepository.findAllById(userId);
	}

	public void delete(Review review) {
		reviewRepository.delete(review);
	}

}
