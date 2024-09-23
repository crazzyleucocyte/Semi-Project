import React, { useEffect, useState } from "react";
import "../../assets/LikesHistory.css"

const LikesHistory = () => {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        // API로 좋아요 내역 조회 예시:
        // setLikes([{ id: 1, title: "좋아요한 게시물1" }, { id: 2, title: "좋아요한 게시물2" }]);
        
        // 예시: 좋아요 내역이 없을 때 빈 배열 유지
        // setLikes([]);
    }, []);

    return (
        <div>
            <h2>좋아요 내역</h2>
            {likes.length === 0 ? ( // 좋아요 내역이 없으면 메시지 표시
                <p>좋아요한 게시물이 없습니다.</p>
            ) : (
                <ul>
                    {likes.map((like) => (
                        <li key={like.id}>{like.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LikesHistory;