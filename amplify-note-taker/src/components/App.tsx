import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote } from '../graphql/mutations';
import { listNotes } from '../graphql/queries';

interface Note {
  id: string;
  note: string;
}

interface RespFromCreateNoteMutation {
  data: {
    createNote: Note;
  };
}

interface RespFromListNotesQuery {
  data: { listNotes: { items: Note[] } };
}

const _App: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [note, setNote] = React.useState('');

  React.useEffect(() => {
    API.graphql(graphqlOperation(listNotes)).then((resp: RespFromListNotesQuery) => {
      const notesFromDB = resp.data.listNotes.items;
      setNotes(notesFromDB);
    });
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNote(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const input = { note };
    API.graphql(graphqlOperation(createNote, { input })).then(
      (resp: RespFromCreateNoteMutation) => {
        const newNote = resp.data.createNote;
        setNotes([...notes, newNote]);
        setNote('');
      }
    );
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
            return (
              <div key={note.id} className="flex items-center">
                <li className="list pa1 f3">{note.note}</li>
                <button className="bg-transparent bn f4">
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
