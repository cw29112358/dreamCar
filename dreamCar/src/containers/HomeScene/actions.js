/*
 *
 * HomeScene actions
 *
 */

import {
  LOAD_EXAMPLE,
  LOAD_EXAMPLE_SUCCESS,
  LOAD_EXAMPLE_FAIL,
} from './constants';

export function loadExampleAction() {
  return {
    type: LOAD_EXAMPLE,
  };
}
export function loadExampleSuccessAction(example) {
  return {
    type: LOAD_EXAMPLE_SUCCESS,
    example,
  };
}
export function loadExampleFailAction(error) {
  return {
    type: LOAD_EXAMPLE_FAIL,
    error,
  };
}
