/* eslint-disable func-names */
import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_DOC = 'GET_SINGLE_DOC';
const UPDATE_SINGLE_DOC = 'UPDATE_SINGLE_DOC';
const CREATE_SINGLE_DOC = 'CREATE_SINGLE_DOC';
// const DELETE_SINGLE_DOC = 'DELETE_SINGLE_DOC'

// ACTION CREATORS
export const gotSingleDocument = (document) => ({
  type: GET_SINGLE_DOC,
  document,
});

export const updatedSingleDocument = (document) => ({
  type: UPDATE_SINGLE_DOC,
  document,
});

export const createdSingleDocument = (document) => ({
  type: CREATE_SINGLE_DOC,
  document,
});

// export const deletedSingleDocument = (id) => ({
//   type: DELETE_SINGLE_DOC,
//   id,
// })

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

export const createSingleDocument = (document) => async (dispatch) => {
  try {
    const { data: newDocument } = await axios.post('/api/documents', document);
    dispatch(createdSingleDocument(newDocument));
  } catch (error) {
    console.error(error);
  }
};

// export const deleteSingleDocument = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`/api/documents/${id}`)
//     dispatch(deletedSingleDocument(id))
//   } catch (error) {
//     console.error(error)
//   }
// }

const initialState = {};

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_DOC:
      return action.document;
    case UPDATE_SINGLE_DOC:
      return { ...state, document: action.document };
    case CREATE_SINGLE_DOC:
      return { ...state, ...action.document };
    // case DELETE_SINGLE_DOC:
    //   return {
    //     ...state,
    //     // eslint-disable-next-line no-underscore-dangle
    //     documents: state.allDocuments.filter((document) => document._id !== action.id),
    //   }
    default:
      return state;
  }
}
