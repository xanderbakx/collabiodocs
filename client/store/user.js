/* eslint-disable func-names */
import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const gotUser = (user) => ({ type: GET_USER, user });
const removedUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const getUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(gotUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line consistent-return
export const auth = (payload, method) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, payload);
  } catch (authError) {
    return dispatch(gotUser({ error: authError }));
  }

  try {
    dispatch(gotUser(res.data));
  } catch (dispatchHistoryErr) {
    console.error(dispatchHistoryErr);
  }
};

export const removeUser = () => async (dispatch) => {
  try {
    await axios.get('/auth/logout');
    dispatch(removedUser());
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
