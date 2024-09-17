
import { createSlice, configureStore } from '@reduxjs/toolkit';

let cityInfo = createSlice({
    name : 'cityInfo',
    initialState : {
        la : "37.5635694444444",
        lo : "126.980008333333",
        ctprvnNm : "서울특별시",
        signguNm : "서울"
    },
    reducers : {
        setCityInfo(state, {payload} ){
            console.log("payload : ", payload)
            // console.log("state : ", state)
            console.log("state before update: ", state.la);

            // payload가 있는 경우 state 값을 업데이트
            if (payload) {
                state.la = payload.la || state.la;
                state.lo = payload.lo || state.lo;
                state.ctprvnNm = payload.ctprvnNm || state.ctprvnNm;
                state.signguNm = payload.signguNm || state.signguNm;
            }

            console.log("state after update: ", state);
            // let obj = {...payload}
            // console.log("obj : ", obj)
            // state.la = payload.la;
            // state.lo = payload.lo;
            // state.ctprvnNm = payload.ctprvnNm;
            // state.signguNm = payload.signguNm;
        }
    }

})
export let { setCityInfo } = cityInfo.actions;

export default configureStore({
    reducer : {
        //내보내기에 등록
        //'작명' : user.reducer
        CityInfo : cityInfo.reducer
       
    }
})