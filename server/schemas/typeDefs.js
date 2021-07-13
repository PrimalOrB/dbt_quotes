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
        notes: [Note]
    }

    type Note {
        _id: ID
        noteText: String
        noteBy: String
        createdAt: String
    }

    type Query {
        quotes: [Quote]
    }

    type Mutation {
        addQuote(customerName: String!, jNum: String, description: String!, priority: String, additionalNotes: String, pcsURL: String, crmURL: String, status: String, PODate: String, POQty: String): Quote
    }
`;

module.exports = typeDefs;
