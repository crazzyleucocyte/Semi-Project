import React from 'react';
import { useParams } from 'react-router-dom';

const postsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `게시글 ${i + 1}`,
  routeType: `경로구분 ${i % 3}`, // 산책경로구분명
  city: `시군구 ${i % 5}`, // 시군구명
  level: `레벨 ${i % 4}`, // 경로레벨명
  time: `${30 + i * 5}분`, // 경로시간명
  likes: 0,
  likedByUser: false,
}));

function PostDetail() {
  const { postId } = useParams();
  const post = postsData.find(p => p.id === parseInt(postId));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>글 번호: {post.id}</p>
      <p>좋아요: {post.likes}</p>
      <p>산책경로구분명: {post.routeType}</p>
      <p>시군구명: {post.city}</p>
      <p>경로레벨명: {post.level}</p>
      <p>경로시간명: {post.time}</p>
    </div>
  );
}

export default PostDetail;
