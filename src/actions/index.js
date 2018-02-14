import apiUrl from '../config';

export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';
export const fetchNotesRequest = () => ({
  type: FETCH_NOTES_REQUEST,
});

export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const fetchNotesSuccess = NOTES => ({
  type: FETCH_NOTES_SUCCESS,
  NOTES,
});

export const FETCH_NOTES_ERROR = 'FETCH_NOTES_ERROR';
export const fetchNotesError = error => ({
  type: FETCH_NOTES_ERROR,
  error,
});

export const ADD_NOTE = 'ADD_NOTE';
export const addNote = NOTE => ({
  type: ADD_NOTE,
  NOTE,
});

export const fetchNotes = () => (dispatch) => {
  dispatch(fetchNotesRequest());
  return fetch(`${apiUrl}/notes`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(notes =>
      dispatch(fetchNotesSuccess(notes)))
    .catch(err =>
      dispatch(fetchNotesError(err)));
};
