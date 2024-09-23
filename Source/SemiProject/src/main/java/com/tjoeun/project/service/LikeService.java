package com.tjoeun.project.service;

import java.time.LocalDateTime;
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
	
	public boolean toggleLike(String lId, Long no) {
        if (likeRepository.existsByLidAndNo(lId, no)) {
        	likeRepository.deleteByLidAndNo(lId, no);
            return false; // 좋아요 취소
        } else {
            Like like = new Like();
            like.setLid(lId);
            like.setNo(no);
            like.setLikeDate(LocalDateTime.now());
            likeRepository.save(like);
            return true; // 좋아요 추가
        }
    }

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
}
