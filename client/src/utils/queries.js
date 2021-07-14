
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
        }
    }
`;
