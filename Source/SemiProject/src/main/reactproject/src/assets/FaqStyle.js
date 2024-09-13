import { styled } from 'styled-components'

/* 오른쪽 버튼 띄우기용 span */
export const RightFloatSpan = styled.span`
   float: right;
`;

/* 모달 배경 */
export const ModalBackgroundArea = styled.div`
   position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* 모달을 최상위로 올리기 */
`;

/* 모달 컨텐츠 박스 */
export const ModalContentArea = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  height: 30%;
  z-index: 11;
  position: relative;
`;

/* 모달 헤드 div */
export const ModalHeadArea = styled.div`
   margin-bottom: 20px;
`;

/* 닫기 버튼 */
export const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

/* 모달 제목 */
export const ModalHeadH2 = styled.h2`
   display: inline;
   top: 10px;
`;

/* 모달 컨텐츠 */
export const ModalFormContentArea = styled.article`
   width: 100%;
`;

/* 폼 내부 label */
export const FormLabel = styled.label`
   display: flex;
   font-size: 20px;
   align-items: center;
`;

/* 폼 내부 input */
export const FormInput = styled.input`
   width: 80%;
   height: 20px;
   margin-left: 10px;
`;

/* 폼 내부 textarea */
export const FormTextArea = styled.textarea`
   width: 80%;
   height: 7em;
   resize: none;
   margin-left: 10px;
`;

/* 폼 내부 submit&reset 버튼 영역 */
export const FormButtonArea = styled.span`
   float: right;
   margin-right: 10%;
`;

/* 폼 submit 버튼 */
export const FormSubmitButton = styled.button`
   border-radius: 4px;
   border: none;
   width: 80px;
   height: 30px;
   background-color: rgba(0, 255, 0, 0.3);
   margin-right: 20px;
   font-size: 20px;
   cursor: pointer;
   
   &:hover {
      background-color: rgba(0, 255, 0, 0.7);
   }
`;

/* 폼 reset 버튼 */
export const FormResetButton = styled.button`
   border-radius: 4px;
   border: none;
   width: 80px;
   height: 30px;
   background-color: rgba(255, 0, 0, 0.3);
   font-size: 20px;
   cursor: pointer;
   
   &:hover {
      background-color: rgba(255, 0, 0, 0.7);
   }
`;

/* 고객지원 이동 헤더 */
export const FaqH3 = styled.h3`
   width: 40%;
   display: inline-flex;
   align-items: center;
   justify-content: space-evenly;
`;