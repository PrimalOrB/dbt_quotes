const { Quote } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )
const { sendEmail } = require( '../utils/email' )
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
      addQuote: async (parent, {input}) => {
        const data = {...input}
        const quote = await Quote.create(data);
        sendEmail(input,'New',quote)
        return quote;
      },
      editQuote: async( parent,{input} ) => {
        const data = {...input}
        let origQuote = await Quote.findOne({_id: input._id})
        let quote = await Quote.findOneAndUpdate( 
          {_id: input._id},
          {"$set": data},
          {"new": true}
          );
        if( origQuote.status !== 'production-ready' && quote.status === 'production-ready'){
          sendEmail(input,'Finished',quote)
        }  
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
