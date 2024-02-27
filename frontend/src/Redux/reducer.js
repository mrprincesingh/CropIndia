import * as types from "./actionTypes";
const initialState = {
  isLoading: false,
  isError: false,
  CropData: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_CROP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.GET_CROP_SUCCES:
      return {
        ...state,
        CropData: payload,
        isLoading: false,
        isError: false,
      };
    case types.GET_CROP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
export {reducer}