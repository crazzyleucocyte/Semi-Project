package com.tjoeun.project.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tjoeun.project.domain.Member;
import com.tjoeun.project.service.MemberService;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.HashMap;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // POST 요청: 로그인 처리
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> m) {
        // 로그인 요청을 처리하는 메서드
        System.out.println("Received login request: " + m);  // 로그인 요청을 콘솔에 출력
        
        // 로그인 서비스 호출 (아이디와 비밀번호로 로그인 시도)
        Optional<Member> loginUser = memberService.login(m.get("id"), m.get("pwd"));
        Map<String, String> response = new HashMap<>();
        
        // 로그인 성공 시
        if (loginUser.isPresent()) {
            Member member = loginUser.get();
            response.put("message", "로그인 성공: " + member.getName());
            response.put("success", "true");
            return ResponseEntity.ok(response);  // 200 OK 응답
        } else {
            // 로그인 실패 시
            response.put("message", "로그인 실패: 잘못된 아이디 또는 비밀번호입니다.");
            response.put("success", "false");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);  // 401 Unauthorized 응답
        }
    }

    // GET 요청: 로그인 상태 확인 (아이디와 비밀번호 확인)
    @GetMapping("/login-status")
    public ResponseEntity<String> checkLoginStatus(String username, String password) {
        // 아이디로 로그인 상태를 확인하는 메서드
        Optional<Member> loginUser = memberService.findByUsername(username);
        
        if (loginUser.isPresent()) {
            Member member = loginUser.get();
            // 비밀번호 확인
            if (member.getPwd().equals(password)) {
                return ResponseEntity.ok("로그인 상태: " + member.getName());  // 로그인 성공 응답
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 비밀번호가 올바르지 않습니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되지 않은 상태입니다.");
        }
    }
    
    // 회원가입 처리
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Member member) {
        try {
            // 회원가입 서비스 호출
            memberService.signUp(member);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("회원가입 실패: " + e.getMessage());
        }
    }
    
    // GET 요청: 아이디 중복 확인
    @GetMapping("/check-id/{id}")
    public ResponseEntity<Boolean> checkUsername(@PathVariable(name="id") String id) {
        // 아이디 중복 체크 서비스 호출
        boolean isTaken = memberService.isUsernameTaken(id);
        return ResponseEntity.ok(isTaken);
    }
    
    // GET 요청: 회원 프로필 정보 가져오기
    @GetMapping("/profile/{id}")
    public ResponseEntity<Member> getProfile(@PathVariable(name="id") String id) {
        System.out.println("id = " + id);  // 아이디를 콘솔에 출력
        
        // ID를 기반으로 회원을 찾는 서비스 호출
        Optional<Member> member = memberService.findByUsername(id);
        
        if (member.isPresent()) {
            return ResponseEntity.ok(member.get());  // 회원 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 회원 정보가 없을 경우 404 응답
        }
    }
    
    // PUT 요청: 회원 정보 수정
    @PutMapping("/profile/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable(name="id") String id, @RequestBody Member updatedMember) {
        System.out.println("id = " + id);  // 수정할 아이디를 콘솔에 출력
        System.out.println("updatedMember = " + updatedMember);  // 수정된 회원 정보를 콘솔에 출력
        
        // ID를 기반으로 회원을 찾는 서비스 호출
        Optional<Member> memberOptional = memberService.findByUsername(id);
        
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            // 회원 정보 업데이트
            member.setName(updatedMember.getName());
            member.setEmail(updatedMember.getEmail());
            member.setPhone(updatedMember.getPhone());
            member.setGender(updatedMember.getGender());
            member.setModifiedDate(LocalDateTime.now());  // 수정 시간 업데이트

            // DB 업데이트
            memberService.updateMember(member);  
            return ResponseEntity.ok("회원 정보가 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보를 찾을 수 없습니다.");
        }
    }
    
    // PUT 요청: 비밀번호 변경
    @PutMapping("/changePassword/{id}")
    public ResponseEntity<String> changePassword(@PathVariable(name="id") String id, @RequestBody Map<String, String> passwordData) {
        // 현재 비밀번호와 새 비밀번호를 받아 비밀번호 변경 처리
        String currentPassword = passwordData.get("currentPassword");
        String newPassword = passwordData.get("newPassword");

        // 사용자 ID로 회원 찾기
        Optional<Member> memberOptional = memberService.findByUsername(id);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();

            // 현재 비밀번호 검증
            if (!member.getPwd().equals(currentPassword)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("현재 비밀번호가 일치하지 않습니다.");
            }

            // 새 비밀번호 설정 및 DB에 저장
            member.setPwd(newPassword);
            memberService.updateMember(member);

            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보를 찾을 수 없습니다.");
        }
    }
    
    // DELETE 요청: 회원 탈퇴 처리
    @DeleteMapping("/profile/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable(name="id") String id) {
        try {
            // 회원 탈퇴 처리 서비스 호출
            boolean isDeleted = memberService.deleteMember(id);
            if (isDeleted) {
                return ResponseEntity.ok("회원 탈퇴가 성공적으로 처리되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원 탈퇴 처리에 실패했습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

    // GET 요청: 비밀번호 확인 처리
    @GetMapping("/getPassword/{id}")
    public ResponseEntity<Map<String, String>> getPassword(@PathVariable(name = "id") String id) {
        // ID를 기반으로 비밀번호를 반환하는 메서드 
        Optional<Member> memberOptional = memberService.findByUsername(id);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            Map<String, String> response = new HashMap<>();
            response.put("password", member.getPwd());  // 비밀번호를 응답에 포함 
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}


    
    
