package com.tjoeun.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.project.domain.CultureFacility;
import com.tjoeun.project.service.CultureFacilityService;

@RestController
@RequestMapping("/culture")
@CrossOrigin(origins = "http://localhost:3000")
public class CultureFacilityController {
	
	@Autowired
	private CultureFacilityService cultureFacilityService;
	
	@PostMapping("/list")
	public Map<String, Object> getAllCultureFacilityList(@RequestBody Map<String, String> map) {
		int page = Integer.parseInt(map.get("page"))-1;
		int numPerPage = Integer.parseInt(map.get("numPerPage"));
		
		
		String keyField = map.get("keyField");
		String keyWord = map.get("keyWord");
		
		System.out.println("page : " + page);
		
		Page<CultureFacility> pageList = null;
		
		if(keyWord == null || keyWord.isEmpty()) {
			pageList = cultureFacilityService.searchList(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC,"cId")));
			System.out.println("keyField : " + keyField);
		} else {
			keyWord = "%" + keyWord + "%";
			System.out.println("keyField : " + keyField);
			
			switch(keyField) {
				case "fcltyName":
					pageList = cultureFacilityService.searchListFcltyNameLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC, "fcltyName")), keyWord);
					break;
				case "ctgryOne":
					pageList = cultureFacilityService.searchListCtgryOneLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC, "ctgryOne")), keyWord);
					break;
				case "ctgryTwo":
					pageList = cultureFacilityService.searchListCtgryTwoLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC, "ctgryTwo")), keyWord);
					break;
				case "ctprvnName":
					pageList = cultureFacilityService.searchListCtprvnNameLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC, "ctprvnName")), keyWord);
					break;
				case "signguName":
					pageList = cultureFacilityService.searchListSignguNameLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC, "signguName")), keyWord);
					break;
				case "entrPetSize":
					pageList = cultureFacilityService.searchListEntrPetSizeLike(PageRequest.of(page, numPerPage, Sort.by(Sort.Direction.DESC, "entrPetSize")), keyWord);
					break;
			}
		}
		int pagePerBlock = 5;
		int endPage = Math.min(pageList.getTotalPages(), page + pagePerBlock);
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("list", pageList.getContent());
		
		result.put("totalRecord", pageList.getTotalElements());
		result.put("totalPages",pageList.getTotalPages());
		result.put("currentPages",pageList.getNumber()+1);
//		result.put("totalPages", (int) Math.ceil((double) pageList.getTotalElements() / numPerPage));
		
		return result;
	}
	
	@GetMapping("/{cId}")
	public CultureFacility getCultureFaciliyById(@PathVariable(name="cId") Long cId) {
		return cultureFacilityService.getCultureFacilityById(cId);
	}

	@GetMapping("/main/data")
	public List<CultureFacility> getMainData(){
		List<CultureFacility> temp = cultureFacilityService.findByPicturePath();
		Set<Integer> random = new HashSet<Integer>();
		Math.floor(Math.random()*11);
		while(random.size()!=10) {
			random.add((int)Math.floor(Math.random()*10));
		}
		
		List<CultureFacility> result= new ArrayList<>();
		for (Integer number : random) {
		    System.out.println(number);
		    result.add(temp.get(number));
		}
		
		System.out.println(result);
		return result;
		
	}
}
