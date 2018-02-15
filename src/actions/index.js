import apiUrl from '../config';

export const EDIT_NOTE = 'EDIT_NOTE';
export const editNote = newDraft => ({
  type: EDIT_NOTE,
  newDraft,
});

export const CHANGE_NOTE_VIEW = 'CHANGE_NOTE_VIEW';
export const changeNoteView = note => ({
  type: CHANGE_NOTE_VIEW,
  note,
});

export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';
export const fetchNotesRequest = () => ({
  type: FETCH_NOTES_REQUEST,
});

export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const fetchNotesSuccess = notes => ({
  type: FETCH_NOTES_SUCCESS,
  notes,
});

export const FETCH_NOTES_ERROR = 'FETCH_NOTES_ERROR';
export const fetchNotesError = error => ({
  type: FETCH_NOTES_ERROR,
  error,
});

export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const saveSuccess = notes => ({
  type: SAVE_SUCCESS,
  notes,
});

export const ADD_NOTE = 'ADD_NOTE';
export const addNote = note => ({
  type: ADD_NOTE,
});

export const UPDATE_NEW_NOTE_TITLE = 'UPDATE_NEW_NOTE_TITLE';
export const updateNewNoteTitle = title => ({
  type: UPDATE_NEW_NOTE_TITLE,
  title,
});

export const UPDATE_NEW_NOTE_CONTENT = 'UPDATE_NEW_NOTE_CONTENT';
export const updateNewNoteContent = content => ({
  type: UPDATE_NEW_NOTE_CONTENT,
  content,
});

export const UPDATE_NEW_NOTE_TAGS = 'UPDATE_NEW_NOTE_TAGS';
export const updateNewNoteTags = tags => ({
  type: UPDATE_NEW_NOTE_TAGS,
  tags,
});

// return fetch(`${apiUrl}/notes`, {
//   method: 'POST',
//   body: JSON.stringify(values),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then(res => {
//     if (!res.ok) {
//       if (
//         res.headers.has('content-type') &&
//         res.headers
//           .get('content-type')
//           .startsWith('application/json')
//       ) {
//         // It's a nice JSON error returned by us, so decode it
//         return res.json().then(err => Promise.reject(err));
//       }
//       // It's a less informative error returned by express
//       return Promise.reject({
//         code: res.status,
//         message: res.statusText
//       });
//     }
//     return;
 

export const postNote = (note) => (dispatch) => {
  console.log('postNote called', note);
  dispatch(fetchNotesRequest());
  return fetch(`${apiUrl}/notes`, {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      console.log('res from inside postNote',res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      console.log('hello from return resjson')
      return res.json();
    })
    .then((note) => {
      console.log(note, 'save success')
      dispatch(saveSuccess(note));
    })
    .catch((err) => {
      dispatch(fetchNotesError(err));
    });
};

export const fetchNotes = () => (dispatch) => {
  dispatch(fetchNotesRequest());
  return fetch(`${apiUrl}/notes`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then((notes) => {
      dispatch(fetchNotesSuccess(notes));
    })
    .catch((err) => {
      dispatch(fetchNotesError(err));
    });
};

export const saveNoteToDb = (note) => (dispatch) => {
  dispatch(fetchNotesRequest());
  console.log('hello world', note)
  return fetch(`${apiUrl}/notes`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then((notes) => {
      dispatch(saveSuccess(notes));
    })
    .catch((err) => {
      dispatch(fetchNotesError(err));
    });
};
