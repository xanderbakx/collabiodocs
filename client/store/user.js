import axios from 'axios';

const GET_AUTH = 'GET_AUTH';

const defaultUser = {};

const getUser = (user) => ({ type: GET_AUTH, user });

export const gotMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/profile');
    dispatch(getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export default (state = defaultUser, action) => {
  switch (action.type) {
    case GET_AUTH:
      return action.user;
    default:
      return state;
  }
};
