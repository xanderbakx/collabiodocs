/* eslint-disable func-names */
import axios from 'axios';

// ACTION TYPES
// const SAVE_DOCUMENT = 'SAVE_DOCUMENT'
const GET_DOCUMENTS = 'GET_DOCUMENTS';

// ACTION CREATORS
// export const savedDocument = (document) => ({
//   type: SAVE_DOCUMENT,
//   document,
// })

export const gotDocuments = (documents) => ({
  type: GET_DOCUMENTS,
  documents,
});

// THUNK CREATORS
// export const saveDocument = (id, documentData) => async (dispatch) => {
//   try {
//     const { data: document } = await axios.post(`/api/documents/${id}`, documentData)
//     dispatch(savedDocument(document))
//   } catch (error) {
//     console.error(error)
//   }
// }

export const getDocuments = () => async (dispatch) => {
  try {
    const { data: documents } = await axios.get('/api/documents');
    dispatch(gotDocuments(documents));
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
    // case SAVE_DOCUMENT:
    //   return { ...state, documentBody: action.document }
    default:
      return state;
  }
}
