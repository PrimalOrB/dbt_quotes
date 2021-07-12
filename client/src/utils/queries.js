
import { gql } from '@apollo/client';

export const QUERY_QUOTES = gql`
      query quotes {
        quotes {
            _id
            customerName
            jNum
            description
        }
    }
`;
