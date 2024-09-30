import React, { useEffect, useState } from "react";
import "../../assets/LikesHistory.css"
import axios from "axios";
import { Link } from "react-router-dom";

const LikesHistory = () => {
    const userId = localStorage.getItem('username');
    const [likes, setLikes] = useState([])
    useEffect(() => {
        axios.get('/like/history/' + userId)
            .then((response) => {
                console.log(response.data)
                setLikes(response.data)
            })
    }, []);

    function NoConfig(number) {
        let result = ''
        if (number > 200000) {
            result = 'culture'
        } else {
            result = 'walk'
        }
        return result
    }

    return (
        <div>
            <br/><br/>
            <span className='mainTitle'><h1>좋아요 내역</h1></span>
            {likes.length === 0 ? ( // 좋아요 내역이 없으면 메시지 표시
                <p>좋아요한 게시물이 없습니다.</p>
            ) : (
                <table className='table-list'>
                    <thead className='thead-list'>
                        <tr>
                            {/* <th>글번호</th> */}
                            <th>No.</th>
                            <th>이름</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {likes.map((likes, i) => {
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td className='detail-td'><Link to={`/${NoConfig(likes.no)}/${likes.no}`}>{likes.name}</Link></td>
                                    <td>{(likes.likeDate).substring(0, 10)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LikesHistory;