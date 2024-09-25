import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewHistory = () => {
    const userId = localStorage.getItem('username');

    useEffect(() => {
        axios.get(`review/history/${userId}`)
             .then((response)=>{
                console.log(response)
             })
             .catch((error)=>{
                console.log(error)
             })

    }, []);

    return (
        <div>
            <h2>후기 내역</h2>
            {/* {reviews.length === 0 ? (  // 후기 내역이 없을 때 메시지 표시
                <p>후기를 작성한 게시물이 없습니다.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>{review.content}</li>
                    ))}
                </ul>
            )} */}
        </div>
    );
};

export default ReviewHistory;