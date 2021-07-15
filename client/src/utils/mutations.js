  
import { gql } from '@apollo/client';

export const ADD_QUOTE = gql`
    mutation addQuote(
        $customerName: String!,
        $jNum: String,
        $description: String!,
        $priority:String,
        $additionalNotes:String,
        $pcsURL:String,
        $crmURL:String,
        $status:String,
        $PODate:String,
        $POQty:String) {
            addQuote(
            customerName: $customerName
            jNum: $jNum
            description: $description
            priority: $priority,
            additionalNotes: $additionalNotes,
            pcsURL: $pcsURL,
            crmURL: $crmURL,
            status: $status,
            PODate: $PODate,
            POQty: $POQty
            ) {
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
    mutation editQuote(
        $id: ID!,
        $customerName: String!,
        $jNum: String,
        $description: String!,
        $priority:String,
        $additionalNotes:String,
        $pcsURL:String,
        $crmURL:String,
        $status:String,
        $PODate:String,
        $POQty:String) {
            editQuote(
            _id: $id    
            customerName: $customerName
            jNum: $jNum
            description: $description
            priority: $priority,
            additionalNotes: $additionalNotes,
            pcsURL: $pcsURL,
            crmURL: $crmURL,
            status: $status,
            PODate: $PODate,
            POQty: $POQty
            ) {
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
