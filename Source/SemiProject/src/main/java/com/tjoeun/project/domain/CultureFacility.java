package com.tjoeun.project.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity(name="CULTURE_FCLT")
public class CultureFacility {
	
//			문화시설id
	@Id
	@SequenceGenerator(
			name="CNO",
			sequenceName = "C_NO_SEQ",
			allocationSize=1,
			initialValue=223930
			)
	@GeneratedValue(generator="CNO")
	@Column(name="C_ID")
	private Long cId;
	
//			시설명(FacilityName)
	@Column(name="FCLTY_NM", nullable=false, length=200)
	@NonNull
	private String fcltyName;
		
//			카테고리1명(CategoryOne)
	@Column(name="CTGRY_ONE", nullable=false, length=200)
	@NonNull
	private String ctgryOne;
	
//			카테고리2명(CategoryTwo)
	@Column(name="CTGRY_TWO", nullable=false, length=200)
	@NonNull
	private String ctgryTwo;
	
//			시도명(CitiesProvincesName)
	@Column(name="CTPRVN_NM", nullable=false, length=200)
	@NonNull
	private String ctprvnName;
	
//			시군구명(SigoonguName)
	@Column(name="SIGNGU_NM", length=200)
	private String signguName;
	
//			위도(LocationLatitude)
	@Column(name="LC_LA", nullable=false, length=20)
	@NonNull
	private Double lcLattd;
	
//			경도(LocationLongitude)
	@Column(name="LC_LO", nullable=false, length=20)
	@NonNull
	private Double lcLongt;
	
//			우편번호(ZipNumber)
	@Column(name="ZIP_NO", length=7, columnDefinition="varchar2(7) DEFAULT '없음'")
	private String zipNumber;
	
//			도로명주소(RoadNameAddress)
	@Column(name="RDNMADR_NM", length=200, columnDefinition="varchar2(200) DEFAULT '없음'")
	private String rdnmadrName;
	
//			지번주소(Lotnameadderss)
	@Column(name="LNM_ADDR", length=200,columnDefinition="varchar2(200) DEFAULT '없음'")
	private String lnmAddress;

//			전화번호(TelephoneNumber)
	@Column(name="TEL_NO", length=20, columnDefinition="varchar2(20) DEFAULT '없음'")
	private String telNumber;
	
//			홈페이지 주소(HomepageUrl)
	@Column(name="HMPG_URL", length=500, columnDefinition="varchar2(500) DEFAULT '없음'")
	private String hmpgUrl;
	
	
//			휴무일 안내내용(RestDateContent)
	@Column(name="RSTDE_CN", length=500, columnDefinition="varchar2(500) DEFAULT '없음'")
	private String rstdeContent;
	
	
//			운영시간(OperationTime)
	@Column(name="OPER_TM", length=500, columnDefinition="varchar2(500) DEFAULT '없음'")
	private String operTime;
	
	
//			주차 가능 여부(ParkingYorN)
	@Column(name="PARKING_YN", length=1, nullable=false)
	@NonNull
	private String parkingYn;
	
	
//			이용가격내용(UtilizationPriceContent)
	@Column(name="UTIL_PRC_CN", length=1000, nullable= false)
	@NonNull
	private String utilPriceCN;

//			반려동물가능여부(		
	@Column(name="PET_ENTR_YN", length=1, nullable= false)
	@NonNull
	private String petEntrYn;
	
//			반려동물정보내용		
	@Column(name="PET_INFO_CN", length=500)
	@NonNull
	private String petInfoCn;
	
//			입장가능반려동물크기값(enterPetCondition)		
	@Column(name="ENTR_PET_SZ", length=200, columnDefinition="varchar2(200) DEFAULT '없음'")
	private String entrPetSize;
	
//			반려동물제한사항내용(PetCondition)		
	@Column(name="PET_CND", length=4000, columnDefinition="varchar2(4000) DEFAULT '없음'")
	private String petCondition;
	
//			내부장소 동반가능여부(insideEnterYN)
	@Column(name="INSD_ENTR_YN", length=1, nullable=false)
	@NonNull
	private String insdEntrYn;
	
//			외부장소 동반가능여부(outsideEnterYN)
	@Column(name="OUTSD_ENTR_YN", length=1, nullable=false)
	@NonNull
	private String outsdEntrYn;
	
//			시설정보설명
	@Column(name="FCLTY_INFO", length=4000, nullable=false)
	@NonNull
	private String fcltyInfo;
	
//			반려동물동반추가요금값
	@Column(name="PET_ADIT_EXTCHRGE", length=200, nullable=false)
	@NonNull
	private String petAditExtracharge;
	
//			사진 경로
	@Column(name="PICTURE_PT", length=4000)
	private String picturePath;
	
//			시설 추가된날짜
	@CreatedDate
	@Column(name="FCLTY_CREATE_DT", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime fcltyCreateDate;
	
//			시설 변경된날짜
	@LastModifiedDate
	@Column(name="FCLTY_MODIFIED_DT", insertable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime fcltyModifiedDate;
	
	@Column(name="LIKE_CT", columnDefinition="NUMBER DEFAULT 0")
	private int likeCount;
	
	@Transient
	private boolean isLiked;
	
}
