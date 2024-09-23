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

    // 로그인 서비스: 아이디와 비밀번호로 로그인 처리
    public Optional<Member> login(String id, String pwd) {
    	// 아이디와 비밀번호로 회원을 조회
    	return memberRepository.findByIdAndPwd(id, pwd);
    }

    // 아이디로 회원 정보 조회
	public Optional<Member> findByUsername(String username) {
		// 아이디를 기반으로 회원을 조회
		return memberRepository.findById(username);
	}

    // 회원가입 처리
	public Member signUp(Member member) {
		// 회원 정보를 저장
		return memberRepository.save(member);
	}

    // 아이디 중복 여부 확인
	public boolean isUsernameTaken(String username) {
		Optional<Member> member = memberRepository.findById(username);
		
		// 해당 아이디의 회원이 존재하는지 여부 반환
		return member.isPresent();
	}

    // 회원 정보 업데이트
	public void updateMember(Member member) {
		// 수정된 회원 정보를 저장 (업데이트 처리)
		memberRepository.save(member);
	}

    // 회원 삭제 (회원 탈퇴 처리)
	public boolean deleteMember(String id) {
		Optional<Member> memberOptional = memberRepository.findById(id);
		
		// 회원이 존재하면 삭제 처리
		if (memberOptional.isPresent()) {
			memberRepository.delete(memberOptional.get());
			return true;  // 삭제 성공
		}
		return false;  // 해당 회원이 존재하지 않음
	}

    // 비밀번호 확인 서비스: 입력된 비밀번호가 맞는지 확인
	public boolean checkPassword(String id, String inputPassword) {
		Optional<Member> memberOptional = memberRepository.findById(id);

		// 회원이 존재하지 않을 경우 false 반환
		if (!memberOptional.isPresent()) {
			return false;
		}

		Member member = memberOptional.get();
		// 입력된 비밀번호와 저장된 비밀번호 비교
		return member.getPwd().equals(inputPassword);
	}
}

	   


