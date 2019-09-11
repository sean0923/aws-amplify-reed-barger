import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote, deleteNote, updateNote } from '../graphql/mutations';
import { listNotes } from '../graphql/queries';

interface Note {
  id: string;
  note: string;
}

interface CreateNoteResp {
  data: { createNote: Note };
}

interface UpdateNoteResp {
  data: { updateNote: Note };
}

interface DeleteNoteResp {
  data: { deleteNote: Note };
}

interface ListNodeResp {
  data: { listNotes: { items: Note[] } };
}

const _App: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [note, setNote] = React.useState('');
  const [selectedNoteId, setSelectedNoteId] = React.useState('');

  React.useEffect(() => {
    API.graphql(graphqlOperation(listNotes)).then((resp: ListNodeResp) => {
      const notesFromDB = resp.data.listNotes.items;
      setNotes(notesFromDB);
    });
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNote(e.target.value);
  };

  const hasExistingNote = (): boolean => {
    if (selectedNoteId) {
      const isId = notes.findIndex((note) => note.id === selectedNoteId) !== -1;
      return isId;
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (hasExistingNote()) {
      // update exsiting note
      const id = selectedNoteId;
      const input = { id, note };
      API.graphql(graphqlOperation(updateNote, { input })).then((resp: UpdateNoteResp) => {
        const updatedNote = resp.data.updateNote;
        const updatedNotes = notes.map((note) => {
          if (note.id === updatedNote.id) {
            return updatedNote;
          }
          return note;
        });

        setNotes(updatedNotes);
        setNote('');
        setSelectedNoteId('');
      });
    } else {
      // create new note
      const input = { note };
      API.graphql(graphqlOperation(createNote, { input })).then((resp: CreateNoteResp) => {
        const newNote = resp.data.createNote;
        setNotes([...notes, newNote]);
        setNote('');
        setSelectedNoteId('');
      });
    }
  };

  const handleDeleteNote = (noteId: string): void => {
    const input = { id: noteId };
    API.graphql(graphqlOperation(deleteNote, { input })).then((resp: DeleteNoteResp) => {
      const deletedNoteId = resp.data.deleteNote.id;
      const filteredNotes = notes.filter((note) => {
        return note.id !== deletedNoteId;
      });
      setNotes(filteredNotes);
    });
  };

  const populateExsitingNoteToInputWhenClicked = ({ id, note }: Note): void => {
    setSelectedNoteId(id);
    setNote(note);
  };

  return (
    <div>
      <Wrapper className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">Amplify Note Taker</h1>
        <form className="mb3" onSubmit={handleSubmit}>
          <input
            value={note}
            type="text"
            className="pa2 f4"
            placeholder="Write your note"
            onChange={handleNoteChange}
          />
          <button type="submit" className="pa2 f4">
            {hasExistingNote() ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        <div>
          {notes.map((note) => {
            return (
              <div key={note.id} className="flex items-center">
                <li
                  className="list pa1 f3"
                  onClick={(): void => populateExsitingNoteToInputWhenClicked(note)}
                >
                  {note.note}
                </li>
                <button
                  className="bg-transparent bn f4"
                  onClick={(): void => handleDeleteNote(note.id)}
                >
                  <span>&times;</span>
                </button>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
};

const App = withAuthenticator(_App, { includeGreetings: true });

export { App };

const Wrapper = styled.div``;
