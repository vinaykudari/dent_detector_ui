import { apiTypes, dataTypes } from '@actionTypes/index';

export const sendForAnalysis = (data) => (dispatch) =>
  dispatch({
    type: apiTypes.SEND_FOR_ANALYSIS,
    endpoint: 'api/analyse/',
    uploadProgressRequired: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });

export const setImage = (image) => ({
  type: dataTypes.SET_IMAGE,
  result: image
});

export const setUseMaxArea = (useMaxAreaOnly) => ({
  type: dataTypes.SET_USE_MAX_AREA_ONLY,
  result: useMaxAreaOnly
});

export const resetData = () => ({
  type: dataTypes.RESET_DATA
});

export const setImageInputMode = (mode) => ({
  type: dataTypes.SET_IMAGE_INPUT_MODE,
  result: mode
});
