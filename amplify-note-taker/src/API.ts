/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateNoteInput = {
  id?: string | null;
  note: string;
};

export type UpdateNoteInput = {
  id: string;
  note?: string | null;
};

export type DeleteNoteInput = {
  id?: string | null;
};

export type ModelNoteFilterInput = {
  id?: ModelIDFilterInput | null;
  note?: ModelStringFilterInput | null;
  and?: Array<ModelNoteFilterInput | null> | null;
  or?: Array<ModelNoteFilterInput | null> | null;
  not?: ModelNoteFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput;
};

export type CreateNoteMutation = {
  createNote: {
    __typename: 'Note';
    id: string;
    note: string;
    owner: string | null;
  } | null;
};

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput;
};

export type UpdateNoteMutation = {
  updateNote: {
    __typename: 'Note';
    id: string;
    note: string;
    owner: string | null;
  } | null;
};

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput;
};

export type DeleteNoteMutation = {
  deleteNote: {
    __typename: 'Note';
    id: string;
    note: string;
    owner: string | null;
  } | null;
};

export type GetNoteQueryVariables = {
  id: string;
};

export type GetNoteQuery = {
  getNote: {
    __typename: 'Note';
    id: string;
    note: string;
    owner: string | null;
  } | null;
};

export type ListNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListNotesQuery = {
  listNotes: {
    __typename: 'ModelNoteConnection';
    items: Array<{
      __typename: 'Note';
      id: string;
      note: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateNoteSubscriptionVariables = {
  owner: string;
};

export type OnCreateNoteSubscription = {
  onCreateNote: {
    __typename: 'Note';
    id: string;
    note: string;
    owner: string | null;
  } | null;
};

export type OnUpdateNoteSubscriptionVariables = {
  owner: string;
};

export type OnUpdateNoteSubscription = {
  onUpdateNote: {
    __typename: 'Note';
    id: string;
    note: string;
    owner: string | null;
  } | null;
};

export type OnDeleteNoteSubscriptionVariables = {
  owner: string;
};

export type OnDeleteNoteSubscription = {
  onDeleteNote: {
    __typename: 'Note';
    id: string;
    note: string;
    owner: string | null;
  } | null;
};
