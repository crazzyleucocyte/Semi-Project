import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ReviewHistory = () => {
    const userId = localStorage.getItem('username');
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/review/history/${userId}`)
            .then((response) => {
                console.log(response.data)
                setReviews(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, []);
    function NoConfig(number){
        let result =''
        if(number>200000){
            result = 'culture'
        }else{
            result = 'walk'
        }
        return result
    }

    return (
        <div>
            <br/><br/>
            <span className='mainTitle'><h2>후기 내역</h2></span>
            {reviews.length === 0 ? (  // 후기 내역이 없을 때 메시지 표시
                <p>후기를 작성한 게시물이 없습니다.</p>
            ) : (
                <table className='table-list'>
                    <thead className='thead-list'>
                        <tr>
                            {/* <th>글번호</th> */}
                            <th>No.</th>
                            <th>이름</th>
                            <th>내용</th>
                            <th>작성 날짜</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, i) => {
                            return (
                                <tr>
                                    <td>{i+1}</td>
                                    <td className='detail-td'><Link to={`/${NoConfig(review.no)}/${review.no}`}>{review.name}</Link></td>
                                    <td>{review.content}</td>
                                    <td>{(review.createDate).substring(0,10)}</td>
                                    <td><button className="button-detail" onClick={() => { navigate(`/review/update/${review.no}/${NoConfig(review.no)}`) }}>수정</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReviewHistory;