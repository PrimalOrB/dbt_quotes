const { Quote } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )

const resolvers = {
    Query: {
        quotes: async (parent, { filterPO, filterPriority, filterDate } ) => {
          const filterSet = {
          }
          const sortSet = {
            'createdAt': -1
          }

          if( filterPO ) {
            filterSet.PODate = { $ne: null }
            sortSet.PODate = 1
          } else {
            delete filterSet.PODate
            delete sortSet.PODate
          }

          if( filterPriority ) {
            filterSet.priority = { $ne: null }
            sortSet.priority = 1
          } else {
            delete filterSet.priority
            delete sortSet.priority
          }

          if( filterDate ) {
            sortSet.createdAt = 1
          } else {
            sortSet.createdAt = -1
          }

          console.log( filterSet )

        return Quote.find( filterSet ).sort(sortSet)
      },
    },

    Mutation: {
      addQuote: async (parent, args) => {
        console.log( args )
        const quote = await Quote.create(args);
        return quote;
      },
    }
}

module.exports = resolvers;
