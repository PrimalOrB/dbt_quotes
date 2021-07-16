const { Quote } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )

const resolvers = {
    Query: {
        quotes: async (parent, { filterPO, filterPriority, filterDate } ) => {
          const filterSet = {
          }
          const sortSet = {
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
            sortSet.createdAt = -1
          } else {
            delete sortSet.createdAt
          }

          console.log( filterSet, sortSet )

        return Quote.find( filterSet )
          .sort( sortSet )
          .populate( 'notes' )
      },
      quote: async (parent, { _id }) => {
        return Quote.findOne({ _id })
      },
    },

    Mutation: {
      addQuote: async (parent, args) => {
        const quote = await Quote.create(args);
        return quote;
      },
      editQuote: async( parent,args ) => {
        let quote = await Quote.findOneAndUpdate( 
          {_id: args._id},
          {"$set":{...args}},
          {"new": true}
          );
        return quote;
      },
      addNote: async( parent, { quoteId, noteText, noteBy } ) => {
        let updatedQuote = await Quote.findOneAndUpdate(
          { _id: quoteId },
          { $push: { notes: { noteText, noteBy } } },
          { new: true, runValidators: true }
        );
        return updatedQuote;
      }
    }
}

module.exports = resolvers;
