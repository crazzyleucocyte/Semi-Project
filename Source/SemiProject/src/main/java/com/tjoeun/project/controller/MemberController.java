package com.tjoeun.project.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
        System.out.println("Received login request: " + m);
        
        Optional<Member> loginUser = memberService.login(m.get("id"), m.get("pwd"));
        Map<String, String> response = new HashMap<>();
        
        if (loginUser.isPresent()) {
            Member member = loginUser.get();
            response.put("message", "로그인 성공: " + member.getName());
            response.put("success", "true");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "로그인 실패: 잘못된 아이디 또는 비밀번호입니다.");
            response.put("success", "false");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // GET 요청: 로그인 상태 확인 (아이디와 비밀번호 확인)
    @GetMapping("/login-status")
    public ResponseEntity<String> checkLoginStatus(String username, String password) {
        Optional<Member> loginUser = memberService.findByUsername(username);
        
        if (loginUser.isPresent()) {
            Member member = loginUser.get();
            if (member.getPwd().equals(password)) {
                return ResponseEntity.ok("로그인 상태: " + member.getName());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 비밀번호가 올바르지 않습니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되지 않은 상태입니다.");
        }
    }
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Member member) {
        try {
            memberService.signUp(member);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("회원가입 실패: " + e.getMessage());
        }
    }
	// id 체크	
    @GetMapping("/check-id/{id}")
    public ResponseEntity<Boolean> checkUsername(@PathVariable(name="id") String id) {
        boolean isTaken = memberService.isUsernameTaken(id);
        return ResponseEntity.ok(isTaken);
    }
    
    
    
    @GetMapping("/profile/{id}")
    public ResponseEntity<Member> getProfile(@PathVariable(name="id") String id) {
        System.out.println("id = " + id);
        
        Optional<Member> member = memberService.findByUsername(id);  // ID를 기반으로 회원 찾기
        
        if (member.isPresent()) {
            return ResponseEntity.ok(member.get());  // 회원 정보를 성공적으로 반환
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 회원 정보가 없는 경우 404 에러 반환
        }
    }
 // 회원 정보 수정
    @PutMapping("/profile/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable(name="id") String id, @RequestBody Member updatedMember) {
        System.out.println("id = " + id);
        System.out.println("updatedMember = " + updatedMember);
        
        Optional<Member> memberOptional = memberService.findByUsername(id);
        
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            // 수정된 정보 적용
            member.setName(updatedMember.getName());
            member.setEmail(updatedMember.getEmail());
            member.setPhone(updatedMember.getPhone());
            member.setGender(updatedMember.getGender());
            member.setModifiedDate(LocalDateTime.now()); // 수정 시간 업데이트

            // DB 업데이트
            memberService.updateMember(member);  
            return ResponseEntity.ok("회원 정보가 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보를 찾을 수 없습니다.");
        }
    
}
    @PutMapping("/changePassword/{id}")
    public ResponseEntity<String> changePassword(@PathVariable(name="id") String id, @RequestBody Map<String, String> passwordData) {
        // 비밀번호 데이터는 currentPassword와 newPassword로 받습니다.
        String currentPassword = passwordData.get("currentPassword");
        String newPassword = passwordData.get("newPassword");

        // 사용자 ID로 회원 찾기
        Optional<Member> memberOptional = memberService.findByUsername(id);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();

            // 현재 비밀번호 검증 (일반 문자열 비교)
            if (!member.getPwd().equals(currentPassword)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("현재 비밀번호가 일치하지 않습니다.");
            }

            // 새 비밀번호 설정 및 저장
            member.setPwd(newPassword);  // 비밀번호 평문으로 저장 (해시화 필요시 추가 가능)
            memberService.updateMember(member);  // 변경된 비밀번호 DB에 업데이트

            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보를 찾을 수 없습니다.");
        }
    }
    
    @DeleteMapping("/profile/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable(name="id") String id) {
        try {
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
    // 비밀번호 확인 요청 처리
    @GetMapping("/getPassword/{id}")
    public ResponseEntity<Map<String, String>> getPassword(@PathVariable(name = "id") String id) {
        Optional<Member> memberOptional = memberService.findByUsername(id);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            Map<String, String> response = new HashMap<>();
            response.put("password", member.getPwd()); // 비밀번호를 응답에 포함 (보안상 비추천)
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}


    
    
