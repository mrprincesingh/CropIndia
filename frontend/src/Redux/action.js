// actions.js
import * as types from "./actionTypes";
import axios from "axios";

export const getCrop = ({state="" , year="" , crop=""}) => async (dispatch) => {
  dispatch({ type: types.GET_CROP_REQUEST });

  try {
    let apiUrl = 'http://localhost:3005/api/indiancrop/crops?';

    if (state.length >0) {
      apiUrl += `&state=${state}`;
    }

    if (year.length >0) {
        apiUrl += `&year=${year}`;
      }
      if(crop.length>0){
        apiUrl += `&crop=${crop}`
      }

    const res = await axios.get(apiUrl);
    dispatch({ type: types.GET_CROP_SUCCES, payload: res.data });
  } catch (error) {
    dispatch({ type: types.GET_CROP_FAILURE, payload: error });
  }
};
