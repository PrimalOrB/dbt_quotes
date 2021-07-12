  
import { gql } from '@apollo/client';

export const ADD_QUOTE = gql`
    mutation addQuote($customerName: String, $jNum: Int, $description: String) {
        addQuote(
        customerName: $customerName
        jNum: $jNum
        description: $description
        ) {
        _id
        customerName
        jNum
        description
        }
    }
`;
