const { Quote } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )

const resolvers = {
    Query: {
        quotes: async () => {
        return Quote.find()
      },

    },

    Mutation: {
      addQuote: async (parent, args) => {
        const quote = await Quote.create(args);
        return quote;
      },
    }
}

module.exports = resolvers;
