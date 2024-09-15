import React, { useEffect, useState } from "react";

const ReviewHistory = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // API로 후기 조회 예시:
        // setReviews([{ id: 1, content: "후기 내용1" }, { id: 2, content: "후기 내용2" }]);
        
        // 예시: 후기 내역이 없을 때 빈 배열 유지
        // setReviews([]);
    }, []);

    return (
        <div>
            <h2>후기 내역</h2>
            {reviews.length === 0 ? (  // 후기 내역이 없을 때 메시지 표시
                <p>후기를 작성한 게시물이 없습니다.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>{review.content}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewHistory;