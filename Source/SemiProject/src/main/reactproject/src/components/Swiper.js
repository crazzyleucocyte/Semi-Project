<Swiper
  spaceBetween={10} // 슬라이드 간의 간격
  slidesPerView={1} // 한 번에 보여줄 슬라이드 개수
  navigation // 네비게이션 버튼 (이전/다음)
  pagination={{ clickable: true }}  // 페이지네이션 버튼 활성화
  autoplay={{ delay: 10 }} // 자동 슬라이드 시간 설정 (3초 간격)
  loop // 슬라이드 무한 반복
  effect="fade" // 페이드 전환 효과
  fadeEffect={{ crossFade: true }} // 부드러운 페이드 전환
  scrollbar={{ draggable: true }} // 스크롤바 모듈에 필요한 스타일
  onSwiper={(swiper) => console.log("swiper : " + swiper)} // Swiper 인스턴스를 수신하는 콜백
  onSlideChange={() => console.log('slide change')}
>
</Swiper>
