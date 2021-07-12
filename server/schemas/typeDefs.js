const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
    type Quote {
        _id: ID
        createdAt: String
        customerName: String
        jNum: Int
        description: String
        priority: Int
        additionalNotes: String
        pcsURL: String
        crmURL: String
        status: String
        PODate: String
        POQty: Int
        notes: [Note]
    }

    type Note {
        _id: ID
        noteText: String
        noteBy: String
        createdAt: String
    }

    type Thought {
        _id: ID
        noteText: String
        noteBy: String
        createdAt: String
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        quotes: [Quote]
        me: User
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
        addQuote(customerName: String, jNum: Int, description: String, priority: Int, additionalNotes: String, pcsURL: String, crmURL: String, status: String, PODate: String, POQty: String): Quote
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addThought(thoughtText: String!): Thought
        addReaction(thoughtId: ID!, reactionBody: String!): Thought
        addFriend(friendId: ID!): User
    }
`;

module.exports = typeDefs;
