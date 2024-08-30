package com.tjoeun.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {

	@RequestMapping("/test")
	public String root() {
		System.out.println("test");
		return "test";
	}
}
