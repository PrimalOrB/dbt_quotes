  
import { gql } from '@apollo/client';

export const ADD_QUOTE = gql`
    mutation addQuote($input: QuoteInput!) {
            addQuote(input: $input) {
                _id
                customerName
                jNum
                description
                priority
                additionalNotes
                pcsURL
                crmURL
                status
                PODate
                POQty
            }
        }
`;

export const EDIT_QUOTE = gql`
    mutation editQuote($input: QuoteInput!) {
            editQuote(input: $input) {
                _id
                customerName
                jNum
                description
                priority
                additionalNotes
                pcsURL
                crmURL
                status
                PODate
                POQty
            }
        }
`;

export const ADD_NOTE = gql`
    mutation addNote($input: NoteInput!) {
        addNote(input: $input) {
                    _id
                noteText
                noteBy
                createdAt
        }
    }
`;

export const LOGIN_USER = gql`
  mutation login($input: String! ) {
    login(input: $input) {
      token
    }
  }
`;
