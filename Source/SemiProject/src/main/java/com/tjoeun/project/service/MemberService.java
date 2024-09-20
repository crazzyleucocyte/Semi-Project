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


	   public void updateMember(Member member) {
	        memberRepository.save(member);  // 수정된 회원 정보 저장 (업데이트 처리)
	    }


	    public boolean deleteMember(String id) {
	        Optional<Member> memberOptional = memberRepository.findById(id);
	        if (memberOptional.isPresent()) {
	            memberRepository.delete(memberOptional.get()); // 회원 정보를 DB에서 삭제
	            return true; // 삭제 성공
	        }
	        return false; // 해당 회원이 존재하지 않음
	    }
	    
	    public boolean checkPassword(String id, String inputPassword) {
	        Optional<Member> memberOptional = memberRepository.findById(id);

	        if (!memberOptional.isPresent()) {
	            return false;
	        }

	        Member member = memberOptional.get();

	        return member.getPwd().equals(inputPassword);
	    }
}
	   


