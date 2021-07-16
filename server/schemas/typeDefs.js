const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
    type Quote {
        _id: ID
        createdAt: String
        customerName: String!
        jNum: String
        description: String!
        priority: String
        additionalNotes: String
        pcsURL: String
        crmURL: String
        status: String
        PODate: String
        POQty: String
        noteCount: Int
        notes: [Note]
    }

    type Note {
        _id: ID
        noteText: String
        noteBy: String
        createdAt: String
    }

    type Query {
        quotes(filterPO: Boolean, filterPriority: Boolean, filterDate: Boolean): [Quote]
        quote(_id: ID!): Quote
    }

    type Mutation {
        addQuote(customerName: String!, jNum: String, description: String!, priority: String, additionalNotes: String, pcsURL: String, crmURL: String, status: String, PODate: String, POQty: String): Quote
        editQuote(_id: ID!, customerName: String!, jNum: String, description: String!, priority: String, additionalNotes: String, pcsURL: String, crmURL: String, status: String, PODate: String, POQty: String): Quote
        addNote(quoteId: ID!, noteText: String!, noteBy: String!): Quote
    }
    
`;

module.exports = typeDefs;
