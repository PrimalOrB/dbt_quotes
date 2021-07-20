
import { gql } from '@apollo/client';

export const QUERY_QUOTES = gql`
      query quotes($filterPO: Boolean, $filterPriority: Boolean, $filterDate: Boolean) {
        quotes(filterPO: $filterPO, filterPriority: $filterPriority, filterDate: $filterDate) {
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
            completedDate
            noteCount
            }
        }
`;

export const QUERY_QUOTE = gql`
      query quote($id:ID!) {
        quote(_id:$id) {
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
            completedDate
            notes{
                _id
                noteText
                noteBy
                createdAt
              }
            }
        }
`;
