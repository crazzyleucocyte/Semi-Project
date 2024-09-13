package com.tjoeun.project.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.project.domain.Member;
import com.tjoeun.project.repository.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepository;


    public Optional<Member> login(String id, String pwd) {
    	return memberRepository.findByIdAndPwd(id, pwd);
    }


	public Optional<Member> findByUsername(String username) {
		  return memberRepository.findById(username);
	}


	public Member signUp(Member member) {
		return memberRepository.save(member);
		
	}


	public boolean isUsernameTaken(String username) {
		Optional<Member> member = memberRepository.findById(username);
		
		if(member.isPresent())
			return true;
		else
			return false;
	}
}
