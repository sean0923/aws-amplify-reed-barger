import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote, deleteNote } from '../graphql/mutations';
import { listNotes } from '../graphql/queries';
import * as ApiTypes from '../API';

const _App: React.FC = () => {
  const [notes, setNotes] = React.useState<ApiTypes.Note[]>([]);
  const [note, setNote] = React.useState('');

  React.useEffect(() => {
    API.graphql(graphqlOperation(listNotes)).then(({ data }: { data: ApiTypes.ListNotesQuery }) => {
      if (data.listNotes) {
        const notesFromDB = data.listNotes.items;
        if (notesFromDB) {
          setNotes(notesFromDB);
        }
      }
    });
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNote(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const input = { note };
    API.graphql(graphqlOperation(createNote, { input })).then(
      ({ data }: { data: ApiTypes.CreateNoteMutation }) => {
        const newNote = data.createNote;
        setNotes([...notes, newNote]);
        setNote('');
      }
    );
  };

  const handleDeleteNote = (noteId: string): void => {
    const input = { id: noteId };
    API.graphql(graphqlOperation(deleteNote, { input })).then((resp) => {
      console.log('resp: ', resp);
    });
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
            Add Note
          </button>
        </form>

        <div>
          {notes.map((note) => {
            if (note) {
              return (
                <div key={note.id} className="flex items-center">
                  <li className="list pa1 f3">{note.note}</li>
                  <button
                    className="bg-transparent bn f4"
                    onClick={(): void => handleDeleteNote(note.id)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
              );
            }
          })}
        </div>
      </Wrapper>
    </div>
  );
};

const App = withAuthenticator(_App, { includeGreetings: true });

export { App };

const Wrapper = styled.div``;
