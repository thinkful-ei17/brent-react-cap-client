import React from 'react';
import { connect } from 'react-redux';
import FormattedNote from './FormattedNote';
import { 
  editNote,
  updateNewNoteTitle,
  updateNewNoteContent, 
} from '../actions';

export function NoteView(props) {
  if (props.creatingNote) {
    return (
      <div className="new-note-form">
        <form 
          onSubmit={event => event.preventDefault()}
        >
          <div className="title-container">
            <label htmlFor="title">Title:</label>
            <input
              autoComplete="false"
              id="title" 
              type="text" 
              onChange={event => props.dispatch(updateNewNoteTitle(event.target.value))}
            />
          </div>
          <div className="note-container">  
            <label htmlFor="note-field">Notes:</label>
            <textarea
              onKeyDown={(event) => { 
                if (event.keyCode === 9) {
                  event.preventDefault();
                  event.target.value += '    ';
                }
              }
              }
              autoComplete="false"
              id="note-field"
              onChange={event => props.dispatch(updateNewNoteContent(event.target.value))}
            />
          </div>
        </form>  
      </div>
    );
  } if (props.markdownView) {
    return (
      <div className="note-form markdown">
        <FormattedNote />
      </div>  
    );
  } else {
    return (
      <div className="note-form">
        <form
          onSubmit={event => event.preventDefault()}
        >
          <h1 
            className={props.hideNoteList ? 'fullscreen' : 'note-title'}
          >
            {props.currentDraft.title}
          </h1>
          <textarea
            onKeyDown={(event) => {
              if (event.keyCode === 9) {
                event.preventDefault();
                event.target.value += '    ';
              }
            }
            }
            autoComplete="false"
            value={props.currentDraft.content}
            onChange={event => props.dispatch(editNote(event.target.value))}
          />
        </form>
      </div>
    );
  } 
}
const mapStateToProps = state => ({
  sortedBy: state.sortedBy,
  currentDraft: state.currentDraft,
  creatingNote: state.creatingNote,
  newNote: state.newNote,
  markdownView: state.markdownView,
});
export default connect(mapStateToProps)(NoteView);
