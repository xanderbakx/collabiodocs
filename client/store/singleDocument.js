/* eslint-disable func-names */
import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_DOC = 'GET_SINGLE_DOC';
const UPDATE_SINGLE_DOC = 'UPDATE_SINGLE_DOCUMENT';

// ACTION CREATORS
export const gotSingleDocument = (document) => ({
  type: GET_SINGLE_DOC,
  document,
});

export const updatedSingleDocument = (document) => ({
  type: UPDATE_SINGLE_DOC,
  document,
});

// THUNK CREATORS
export const getSingleDocument = (id) => async (dispatch) => {
  try {
    const { data: document } = await axios.get(`/api/documents/${id}`);
    dispatch(gotSingleDocument(document));
  } catch (error) {
    console.error(error);
  }
};

export const updateSingleDocument = (id, document) => async (dispatch) => {
  try {
    const { data: updatedDocument } = await axios.put(
      `/api/documents/${id}`,
      document,
    );
    dispatch(updatedSingleDocument(updatedDocument));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {};

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_DOC:
      return action.document;
    case UPDATE_SINGLE_DOC:
      return { ...state, document: action.document };
    default:
      return state;
  }
}
