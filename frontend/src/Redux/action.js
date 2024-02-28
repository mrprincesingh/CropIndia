import * as types from "./actionTypes";
import axios from "axios";

 export const getCrop = ({state="" , year="" , page}) => (dispatch) => {
console.log("state , year" , state , year)
    dispatch({type: types.GET_CROP_REQUEST});
    return axios
    .get(`http://localhost:3005/api/indiancrop/getDataByYear?state=${state}&year=${year}`)
    .then((res) => {
      //  console.log(res)
        dispatch({type: types.GET_CROP_SUCCES, payload: res.data});
   
    })
    .catch((e) => {
        dispatch({type: types.GET_CROP_FAILURE, payload: e});
    });
    
  
};


export const getCrop1 = () => (dispatch) => {
    console.log("state , year" )
        dispatch({type: types.GET_CROP_REQUEST});
        return axios
        .get(`http://localhost:3005/api/indiancrop/getDataByYear`)
        .then((res) => {
          //  console.log(res)
            dispatch({type: types.GET_CROP_SUCCES, payload: res.data});
       
        })
        .catch((e) => {
            dispatch({type: types.GET_CROP_FAILURE, payload: e});
        });
        
      
    };