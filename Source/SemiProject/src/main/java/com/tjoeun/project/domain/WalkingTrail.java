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
@Entity(name="WALKING_TRAIL")
public class WalkingTrail {
	
//			산책로id
	@Id
	@SequenceGenerator(
		name="WNO",
		sequenceName = "W_NO_SEQ",
		allocationSize=1,
		initialValue=101568
		)
	@GeneratedValue(generator="WNO")
	@Column(name="W_ID")
	private Long wId;
	
//			산책로명(WalkingTrailName)
	@Column(name="WLKTRL_NM",nullable=false, length=200)
	@NonNull
	private String wlktrlName;
	
//			산책로코스명(CourseName)
	@Column(name="COURS_NM",nullable=false, length=200)
	@NonNull
	private String coursName;
	
//			경로 설명(courseDescription)
	@Column(name="COURS_DC",nullable=false, length=4000)
	@NonNull
	private String coursDescript;
	
//			시도명(CitiesProvincesName)
	@Column(name="CTPRVN_NM",nullable=false, length=200)
	@NonNull
	private String ctprvnNm;
	
//			시군구명(SigoonguName)
	@Column(name="SIGNGU_NM",nullable=false, length=200)
	@NonNull
	private String signguNm;
	
//			경로 레벨(CourseLevelName)
	@Column(name="COURS_LV_NM",nullable=false, length=200)
	@NonNull
	private String coursLvNm;
	
//			경로 길이내용(CourseContent)
	@Column(name="COURS_CN",nullable=false, length=500)
	@NonNull
	private String coursContent;
	
//			경로 상세 길이내용(CourseDetailContent)
	@Column(name="COURS_DT_CN", length=500)
	private String coursDtContent;
	
//			추가설명(AdditionDescription)
	@Column(name="ADIT_DC", length=4000)
	private String aditDescript;
	
//			경로시간내용(CourseTimeContent)
	@Column(name="COURS_TM_CN", length=500)
	private String coursTmContent;
	
//			옵션설명(OptionDescription)
	@Column(name="OPTN_DC", length=500)
	private String optnDescript;
	
//			화장실설명(ToiletDescription)
	@Column(name="TOILET_DC", length=500)
	private String toiletDescript;
	
//			편의시설명(ConvenienceDescription)
	@Column(name="CNVN_DC", length=500)
	private String cnvnDescript;
	
//			지번주소(LotNameAddress)
	@Column(name="LNM_ADDR", length=500)
	private String lnmAddress;
	
//			위도(Latitude)
	@Column(name="LC_LA", nullable=false, length=20)
	@NonNull
	private Double lcLattd;
	
//			경도(Longitude)
	@Column(name="LC_LO", nullable=false, length=20)
	@NonNull
	private Double lcLongt;
//			사진 경로
	@Column(name="PICTURE_PT", length=4000)
	private String picturePath;
	
	//		시설 추가된날짜
	@CreatedDate
	@Column(name="WLK_CREATE_DT", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime wlkCreateDate;
	
	//		시설 변경된날짜
	@LastModifiedDate
	@Column(name="WLK_MODIFIED_DT", insertable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime wlkModifiedDate;
	
//	sql문 파일이랑 이 컬럼들이랑 컬럼 맞추기
	
	@Column(name="LIKE_CT", columnDefinition="NUMBER DEFAULT 0")
	private int likeCount;

	@Transient
	private boolean isLiked;
}
