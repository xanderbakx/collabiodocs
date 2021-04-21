/* eslint-disable func-names */
import axios from 'axios';

// ACTION TYPES
const GET_DOCUMENTS = 'GET_DOCUMENTS';
const DELETE_SINGLE_DOC = 'DELETE_SINGLE_DOC';

// ACTION CREATORS
export const gotDocuments = (documents) => ({
  type: GET_DOCUMENTS,
  documents,
});

export const deletedSingleDocument = (id) => ({
  type: DELETE_SINGLE_DOC,
  id,
});

// THUNK CREATORS
export const getDocuments = () => async (dispatch) => {
  try {
    const { data: documents } = await axios.get('/api/documents');
    dispatch(gotDocuments(documents));
  } catch (error) {
    console.error(error);
  }
};

export const deleteSingleDocument = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/documents/${id}`);
    dispatch(deletedSingleDocument(id));
  } catch (error) {
    console.error(error);
  }
};

const initialState = [];

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENTS:
      return action.documents;
    case DELETE_SINGLE_DOC:
      // eslint-disable-next-line no-underscore-dangle
      return state.filter((document) => document._id !== action.id);
    default:
      return state;
  }
}
