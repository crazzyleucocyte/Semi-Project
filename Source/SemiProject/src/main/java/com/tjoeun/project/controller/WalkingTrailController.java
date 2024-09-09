package com.tjoeun.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.project.domain.WalkingTrail;
import com.tjoeun.project.service.WalkingTrailService;

@RestController
@RequestMapping("/walking")
public class WalkingTrailController {
	
	@Autowired
	WalkingTrailService walkingTrailService;
	
	@GetMapping("/")
	public ResponseEntity<?> findAll() {
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
	
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
	public List<WalkingTrail> getAllWalkingList(@RequestBody Map<String, String> map) {
		int page = Integer.parseInt(map.get("page"));
		int numPerPage = Integer.parseInt(map.get("numPerPage"));
		String keyField = map.get("keyField");
		String keyWord = map.get("keyWord");
		int startNum=100001;
		int endNum=101535;
		
		System.out.println("page : " + page);
		//List<WalkingTrail> result = walkingTrailService.getAllWalkingList(startNum, endNum);
		
		Page<WalkingTrail> pageList = null;
		
		
		if(keyWord == null || keyWord.isEmpty()) {
			System.out.println("boardList keyWord : "+keyWord +"keyField : "+ keyField);
			pageList = 
					walkingTrailService.serchtList(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"wId")));
			System.out.println("keyField : " + keyField);
		}else {
			keyWord="%"+keyWord+"%";
			switch(keyField) {
			
				case "wlktrlName" :
					// 매개변수(키워드, 페이지번호, 페이지당 레코드수) 
					pageList = walkingTrailService.serchtListWlktrlNameLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"wlktrlName")),keyWord);
					break;
				case "signguNm":
					pageList = 
							walkingTrailService.serchtListsignguNmLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"signguNm")), keyWord);
					break;
				case "coursLvNm" :
					pageList = 
							walkingTrailService.serchtListCoursLvNmLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"coursLvNm")), keyWord);
					break;
				
				case "coursTmContent":
					pageList = 
							walkingTrailService.serchtListCoursTmContentLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"coursTmContent")), keyWord);				break;
			}
		}
		int pagePerBlock = 5;	// [1][2][3][4][5]
		int endPage = Math.min(pageList.getTotalPages(), page + pagePerBlock);
		return pageList.getContent();
	}
	
	

}
