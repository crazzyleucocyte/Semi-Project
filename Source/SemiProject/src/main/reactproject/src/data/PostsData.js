// PostsData.js

export const postsData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `게시글 ${i + 1}`,
    routeType: `경로구분 ${i % 3}`, // 산책경로구분명
    city: `시군구 ${i % 5}`, // 시군구명
    level: `레벨 ${i % 4}`, // 경로레벨명
    time: `${30 + i * 5}분`, // 경로시간명
    length: `${(i + 1) * 1.2} km`, // 경로길이
    address: `지번주소 ${i + 1}`, // 지번주소
    weather: '', // 날씨 정보 (초기에는 빈값, API 통합 가능)
    likes: 0,
    likedByUser: false,
    description: `이 경로는 매우 아름답습니다. 경로 ${i + 1}을 따라 산책해 보세요.`, // 경로설명
    photos: [`/path/to/photo${i + 1}.jpg`], // 사진 경로 배열
    additionalInfo: '이 경로는 주말에 매우 붐빕니다.', // 추가설명
    options: '자전거, 인라인 스케이트', // 옵션설명
    restroom: '이 경로에는 공공 화장실이 있습니다.', // 화장실설명
    amenities: '주차장, 벤치, 음료수 자판기', // 편의시설명
  }));
  