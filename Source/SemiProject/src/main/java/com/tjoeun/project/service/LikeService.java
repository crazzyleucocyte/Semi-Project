package com.tjoeun.project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.project.domain.Like;
import com.tjoeun.project.repository.LikeRepository;
import com.tjoeun.project.domain.LikeId;

@Service
public class LikeService {
	@Autowired
	LikeRepository likeRepository;
	
	

	public boolean isLiked(String lId, Long no) {
		return likeRepository.existsByLidAndNo(lId, no);
	}

	public void deleteLike(Like like) {
		likeRepository.delete(like);
	}

	public void addLike(Like like) {
		likeRepository.save(like);
	}

	public Optional<Like> findByIdAndNo(String lId, Long no) {
		return likeRepository.findByLidAndNo(lId, no);
	}

	public Like deleteLike(String lId, Long no) {
		return likeRepository.deleteByLidAndNo(lId, no);
	}

	public List<Like> findById(String lId) {
		
		return likeRepository.findAllById(lId);
	}
}
