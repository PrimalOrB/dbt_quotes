const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
    input QuoteInput {
        _id: ID
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
    }

    input NoteInput {
        quoteId: ID!
        noteText: String!
        noteBy: String!
    }
    

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
        completedDate: String
        noteCount: Int
        notes: [Note]
    }

    type Note {
        _id: ID
        noteText: String!
        noteBy: String!
        createdAt: String
    }

    type Query {
        quotes(filterPO: Boolean, filterPriority: Boolean, filterDate: Boolean): [Quote]
        quote(_id: ID!): Quote
    }

    type User {
        email: String
    }

    type Auth {
        token: ID!
        user: User
    }


    type Mutation {
        login(email: String! ): Auth
        addQuote(input: QuoteInput!): Quote
        editQuote(input: QuoteInput!): Quote
        addNote(input: NoteInput!): Note
    }
    
`;

module.exports = typeDefs;
