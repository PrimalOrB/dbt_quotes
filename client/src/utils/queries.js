
import { gql } from '@apollo/client';

export const QUERY_QUOTES = gql`
      query quotes {
        quotes {
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
        }
    }
`;
