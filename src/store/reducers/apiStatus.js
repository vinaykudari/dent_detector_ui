import { combineReducers } from 'redux';
import { apiTypes } from '@actionTypes/index';
import createApiStatusHandler from '@utils/createApiStatusHandler';

const apiStatus = combineReducers({
  [apiTypes.SEND_FOR_ANALYSIS]: createApiStatusHandler(
    apiTypes.SEND_FOR_ANALYSIS,
    true
  )
});

export default apiStatus;
