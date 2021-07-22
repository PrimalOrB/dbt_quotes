const { Quote } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )
const { sendEmail } = require( '../utils/email' )

const resolvers = {
    Query: {
        quotes: async (parent, { filterPO, filterPriority, filterDate }, context ) => {
          if( context.headers.authorization !== undefined ){
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
  
          return Quote.find( filterSet )
            .sort( sortSet )
            .populate( 'notes' )
          }
          throw new AuthenticationError('Incorrect credentials');
      },
      quote: async (parent, { _id }, context) => {
        if( context.headers.authorization !== undefined ){
          return Quote.findOne({ _id })
        }
        throw new AuthenticationError('Incorrect credentials');
      },
    },

    Mutation: {
      addQuote: async (parent, {input}, context) => {
        if( context.headers.authorization !== undefined ){
          const data = {...input}
          const quote = await Quote.create(data);
          // sendEmail(input,'New',quote)
          return quote;
        }
        throw new AuthenticationError('Incorrect credentials');
      },
      editQuote: async( parent, {input}, context ) => {
        if( context.headers.authorization !== undefined ){
        const data = {...input}
        let origQuote = await Quote.findOne({_id: input._id})
            // reset task date on unarchived jobs
          if( origQuote.status === 'archived' && data.status !== 'archived'){
            data.createdAt = new Date()
          }  
            // reset completed date on jobs put back to dashboard from ready
          if( origQuote.status === 'production-ready' && ( data.status !== 'production-ready' || data.status !== 'archived' )){
            data.completedDate = null
          }
          // on task set to archive, set complete date
          if( ( origQuote.status !== 'production-ready' || origQuote.status !== 'archived' ) && data.status === 'archived'){
            data.completedDate = new Date()
          } 
            // on task set to ready, send finished email and set complete date
          if( origQuote.status !== 'production-ready' && data.status === 'production-ready'){
            sendEmail(input,'Finished',data)
            data.completedDate = new Date()
          } 
           // on task set to ready, send finished email and set complete date
          if( origQuote.status === 'archived' && data.status !== 'archived'){
            sendEmail(input,'Unarchived',data)
            data.completedDate = new Date()
          } 
          let quote = await Quote.findOneAndUpdate( 
            {_id: input._id},
            {"$set": data},
            {"new": true}
            );       
          return quote;
        }
        throw new AuthenticationError('Incorrect credentials');
      },
      addNote: async( parent, { input }, context ) => {
        if( context.headers.authorization !== undefined ){
          const { noteText, noteBy } = input
          let updatedQuote = await Quote.findOneAndUpdate(
            { _id: input.quoteId },
            { $push: { notes: { noteText, noteBy } } },
            { new: true, runValidators: true }
          );
          return updatedQuote;
        }
        throw new AuthenticationError('Incorrect credentials');
      },
      login: async( parent, { email }, context ) => {
        if( context.headers.authorization !== undefined ){
          const token = signToken( email )
          return { token }
        }
        throw new AuthenticationError('Incorrect credentials');
      }
    }
}

module.exports = resolvers;
