  
import { gql } from '@apollo/client';

export const ADD_QUOTE = gql`
    mutation addQuote($input: QuoteInput!) {
            addQuote(input: $input) {
                _id
            createdAt
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
            statusMtl
            mtlURL
            completedDate
            noteCount
            notes{
                _id
                noteText
                noteBy
                createdAt
              }
            }
        }
`;

export const EDIT_QUOTE = gql`
    mutation editQuote($input: QuoteInput!) {
            editQuote(input: $input) {
                _id
                createdAt
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
                statusMtl
                mtlURL
                completedDate
                noteCount
                notes{
                    _id
                    noteText
                    noteBy
                    createdAt
                }
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
  mutation login($email: String! ) {
    login(email: $email) {
      token
      user {
          email
      }
    }
  }
`;
