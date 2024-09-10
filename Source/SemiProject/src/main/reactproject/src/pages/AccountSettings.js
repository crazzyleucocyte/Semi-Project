import React from "react";

const AccountSettings = () => {
    const handleDeleteAccount = () => {
        // 사용자에게 회원 탈퇴 확인을 요청
        const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
        
        if (isConfirmed) {
            // 회원 탈퇴 API 호출
            console.log("회원 탈퇴 처리");
        } else {
            console.log("회원 탈퇴 취소");
        }
    };

    return (
        <div>
            <h2>계정 설정</h2>
            <button onClick={handleDeleteAccount}>회원 탈퇴</button>
        </div>
    );
};

export default AccountSettings;