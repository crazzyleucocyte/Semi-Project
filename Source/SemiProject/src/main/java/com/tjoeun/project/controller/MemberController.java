package com.tjoeun.project.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.tjoeun.project.domain.Member;
import com.tjoeun.project.service.MemberService;
import java.util.Map;
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
}