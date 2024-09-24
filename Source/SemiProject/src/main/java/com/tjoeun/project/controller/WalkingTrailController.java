package com.tjoeun.project.controller;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.project.domain.WalkingTrail;
import com.tjoeun.project.repository.WalkingTrailRepository;
import com.tjoeun.project.service.WalkingTrailService;

@RestController
@RequestMapping("/walking")
//@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
public class WalkingTrailController {

    @Autowired
    private WalkingTrailService walkingTrailService;
    
    @Autowired
	WalkingTrailRepository walkingTrailRepository;
    
    @PostMapping("/list")
	public Map<String, Object> getAllWalkingList(@RequestBody Map<String, String> map) {
		int page = Integer.parseInt(map.get("page"))-1;
		int numPerPage = Integer.parseInt(map.get("numPerPage"));
		String keyField = map.get("keyField");
		String keyWord = map.get("keyWord");
		System.out.println("numPerPage : "+ numPerPage);
		System.out.println("keyField : "+ keyField);
		System.out.println("keyWord : "+ keyWord);
		
		
		System.out.println("page : " + page);
		// List<WalkingTrail> result = walkingTrailService.getAllWalkingList(startNum, endNum);
		
		Page<WalkingTrail> pageList = null;
		
		if(keyWord == null || keyWord.isEmpty()) {
			System.out.println("boardList keyWord : "+keyWord +"keyField : "+ keyField);
			pageList = walkingTrailService.serchtList(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"wId")));
			System.out.println("keyField : " + keyField);
		}else {
			keyWord="%"+keyWord+"%";
			System.out.println("keyField : " + keyField);
			
			switch(keyField) {
				case "wlktrlName" :
					pageList = walkingTrailService.serchtListWlktrlNameLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"wlktrlName")),keyWord);
					break;
				case "signguNm":
					pageList = walkingTrailService.serchtListSignguNmLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"signguNm")), keyWord);

					break;
				case "coursLvNm" :
					pageList = walkingTrailService.serchtListCoursLvNmLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"coursLvNm")), keyWord);
					break;
				case "coursTmContent":
					pageList = walkingTrailService.serchtListCoursTmContentLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"coursTmContent")), keyWord);
				break;
			}
		}
		int pagePerBlock = 5;	// [1][2][3][4][5]
		int endPage = Math.min(pageList.getTotalPages(), page + pagePerBlock);

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("list", pageList.getContent());
		result.put("totalRecord", pageList.getTotalElements());
		result.put("totalPages", pageList.getTotalPages());
		System.out.println("pageList : "+ pageList.getContent());
		return result;
	}
	
    @GetMapping("/{wId}")
	public WalkingTrail getWalkingTrailById(@PathVariable(name="wId") Long wId) {
		return walkingTrailService.getWalkingTrailById(wId);
	}
    
    
}
