import { apiTypes, dataTypes } from '@actionTypes/index';
import createReducer from '@utils/createReducer';
import { imageInputModes } from '@constants/index';

const defaultUseMaxAreaOnly = false;

const initialState = {
  threshold: {},
  response: {},
  image: {},
  useMaxAreaOnly: defaultUseMaxAreaOnly,
  status: null,
  imageInputMode: imageInputModes.chooseFile
};

const actionMap = {
  [`${apiTypes.SEND_FOR_ANALYSIS}_SUCCESSFUL`](state, { result }) {
    return {
      ...state,
      response: result || {}
    };
  },
  [dataTypes.SET_IMAGE](state, { result }) {
    return {
      ...state,
      image: result || {}
    };
  },
  [dataTypes.SET_USE_MAX_AREA_ONLY](state, { result }) {
    return {
      ...state,
      useMaxAreaOnly: result ?? defaultUseMaxAreaOnly
    };
  },
  [dataTypes.RESET_DATA](state) {
    return {
      ...state,
      response: {},
      image: {},
      status: null,
      useMaxAreaOnly: defaultUseMaxAreaOnly,
      imageInputMode: imageInputModes.chooseFile
    };
  },
  [dataTypes.SET_IMAGE_INPUT_MODE](state, { result }) {
    return {
      ...state,
      imageInputMode: result || imageInputModes.chooseFile
    };
  }
};

const reducer = createReducer({ initialState, actionMap });

export default reducer;
