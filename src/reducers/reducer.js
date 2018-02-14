import {
  FETCH_NOTES_ERROR,
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  ADD_NOTE,
  EDIT_NOTE,
} from '../actions';

const initialState = {
  error: null,
  loading: false,
  notes: [''],
  sortedBy: '',
  currentDraft: '',
  // whole note object
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_NOTES_ERROR:
    return {
      ...state,
      error: action.error,
      loading: false,
      notes: [],
    };
  case FETCH_NOTES_REQUEST:
    console.log('req made');
    return {
      ...state,
      error: null,
      loading: true,
    };
  case FETCH_NOTES_SUCCESS:
    console.log(action.notes);
    return {
      ...state,
      error: null,
      loading: false,
      notes: action.notes,
      currentDraft: action.notes[0].content,
    };
  case ADD_NOTE:
    return {
      ...state,
      notes: action.notes,
    };
  case EDIT_NOTE:
    console.log('hello from edit note');
    return {
      ...state,
      currentDraft: action.newDraft,
    };
  default:
    return state;
  }
};

export default reducer;

