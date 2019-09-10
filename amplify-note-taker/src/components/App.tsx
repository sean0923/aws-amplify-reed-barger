import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import styled from 'styled-components';

interface Note {
  id: string;
  note: string;
}

const _App: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([{ id: '1', note: 'hellow world' }]);

  return (
    <div>
      <Wrapper className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">Amplify Note Taker</h1>
        <form className="mb3">
          <input type="text" className="pa2 f4" placeholder="Write your note" />
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
