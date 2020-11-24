/*
 *
 * HomeScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  LOAD_EXAMPLE,
  LOAD_EXAMPLE_SUCCESS,
  LOAD_EXAMPLE_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function homeSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAMPLE:
      return state.set('isExampleLoading', true);
    case LOAD_EXAMPLE_SUCCESS: {
      return state
        .set('example', getImmutableData(action.example))
        .set('isExampleLoading', false);
    }
    case LOAD_EXAMPLE_FAIL:
      return state.set('isExampleLoading', false);
    default:
      return state;
  }
}

export default homeSceneReducer;
