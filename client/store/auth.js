import axios from 'axios';

const GET_AUTH = 'GET_AUTH';

const initialState = {
  user: {},
};

const getUser = (user) => ({ type: GET_AUTH, user });

// eslint-disable-next-line consistent-return
export const login = (form) => async (dispatch) => {
  try {
    const { data } = await axios.put('/auth/login', form);
    return dispatch(getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const gotMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
