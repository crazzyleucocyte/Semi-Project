package com.tjoeun.project.controller;


import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.tjoeun.project.domain.WalkingTrail;
import com.tjoeun.project.service.WalkingTrailService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/walking")
public class WalkingTrailController {
	
	@Autowired
	WalkingTrailService walkingTrailService;
	

//	@GetMapping("/{page}/{numPerPage}")
//	public List<WalkingTrail> getAllWalkingList(@PathVariable(name="page") int page, @PathVariable(name="numPerPage") int numPerPage) {
//		int startNum=100001;
//		int endNum=101535;
//		System.out.println("page : " + page);
//		List<WalkingTrail> result = walkingTrailService.getAllWalkingList(startNum, endNum);
//		
//		return result;
//	}

	
	@PostMapping("/list")
	public Map<String, Object> getAllWalkingList(@RequestBody Map<String, String> map) {
		int page = Integer.parseInt(map.get("page"));
		int numPerPage = Integer.parseInt(map.get("numPerPage"));
		
		String keyField = map.get("keyField");
		String keyWord = map.get("keyWord");
		
		
		
		System.out.println("page : " + page);
		// List<WalkingTrail> result = walkingTrailService.getAllWalkingList(startNum, endNum);
		
		Page<WalkingTrail> pageList = null;
		

		if(keyWord == null || keyWord.isEmpty()) {
			System.out.println("boardList keyWord : "+keyWord +"keyField : "+ keyField);
			pageList = 
					walkingTrailService.serchtList(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"wId")));
			System.out.println("keyField : " + keyField);
		}else {
			keyWord="%"+keyWord+"%";

			System.out.println("keyField : " + keyField);
			switch(keyField) {
			
				case "wlktrlName" :
				// 매개변수(키워드, 페이지번호, 페이지당 레코드수) 

					pageList = walkingTrailService.serchtListWlktrlNameLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"wlktrlName")),keyWord);
					break;
				case "signguNm":
					pageList = 

							walkingTrailService.serchtListSignguNmLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"signguNm")), keyWord);

					break;
				case "coursLvNm" :
					pageList = 
							walkingTrailService.serchtListCoursLvNmLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"coursLvNm")), keyWord);
					break;
				
				case "coursTmContent":
					pageList = 
							walkingTrailService.serchtListCoursTmContentLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"coursTmContent")), keyWord);
				break;
			}
		}
		int pagePerBlock = 5;	// [1][2][3][4][5]
		int endPage = Math.min(pageList.getTotalPages(), page + pagePerBlock);

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("list", pageList.getContent());
		result.put("totalRecord", pageList.getTotalElements());
		
		return result;
	}
	
	@GetMapping("/{wId}")
	public WalkingTrail getWalkingTrailById(@PathVariable Long wId) {
		return walkingTrailService.getWalkingTrailById(wId);
	}
	
//	@GetMapping("/list")
//	public Page<WalkingTrail> getWalkingTrails(
//			@RequestParam(defaultValue = "0") int page,		// 요청 페이지 번호
//			@RequestParam(defaultValue = "10") int size		// 한 페이지에 표시할 데이터 수
//			){
//		Pageable pageable = PageRequest.of(page, size);
//		return walkingTrailService.getWalkingTrails(pageable);
//	}
//	


}
