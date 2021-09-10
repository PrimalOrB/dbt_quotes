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
          sendEmail(input,'New',quote)

          // note text
          const noteBy = data.user
          const noteText = 'Record created' 

          // on create if material needed
          if( data.statusMtl === 'need-order' ){
            sendEmail( input,'Material', data )
          } 
          
          // add note to quote
          let updatedQuote = await Quote.findOneAndUpdate(
            { _id: quote._id },
            { $push: { notes: { noteText, noteBy } } },
            { new: true, runValidators: true }
          );
          return updatedQuote;
        }
        throw new AuthenticationError('Incorrect credentials');
      },
      editQuote: async( parent, { input }, context ) => {
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
            sendEmail( input,'Finished', data )
            data.completedDate = new Date()
          } 
          // on task unarchive, set completed date to null
          if( origQuote.status === 'archived' && data.status !== 'archived'){
            sendEmail( input,'Unarchived', data )
            data.completedDate = null
          } 
          // if material has changed, and is not 'confirmed or received'
          if( origQuote.statusMtl !== data.statusMtl && data.statusMtl !== null && data.statusMtl !== 'ordered-confirmed' && data.statusMtl !== 'ordered-received' ){
            sendEmail( input,'Material', data )
          } 
          
          // note text
          const noteBy = data.user
          let noteText = 'Edited' 
          if( origQuote.customerName !== data.customerName ) {
            noteText = `${ noteText }, customer name changed`
          }
          if( Number( origQuote.jNum ) !== Number( data.jNum ) ) {
            noteText = `${ noteText }, j# changed`
          }
          if( origQuote.description !== data.description ) {
            noteText = `${ noteText }, description changed`
          }
          if( Number( origQuote.priority ) !== Number( data.priority ) ) {
            noteText = `${ noteText }, priority changed`
          }
          if( origQuote.additionalNotes !== data.additionalNotes ) {
            noteText = `${ noteText }, additional notes changed`
          }
          if( origQuote.pcsURL !== data.pcsURL ) {
            noteText = `${ noteText }, PCS URL changed`
          }
          if( origQuote.crmURL !== data.crmURL ) {
            noteText = `${ noteText }, PCS URL changed`
          }
          if( Number( origQuote.PODate ) !== Number( data.PODate ) ) {
            noteText = `${ noteText }, PO date changed`
          }
          if( Number( origQuote.POQty ) !== Number( data.POQty ) ) {
            noteText = `${ noteText }, PO Qty changed`
          }
          if( origQuote.status !== data.status ) {
            noteText = `${ noteText }, status changed to ${ data.status }`
          }
          if( origQuote.statusMtl !== data.statusMtl && origQuote.statusMtl !== undefined && data.statusMtl ) {
            noteText = `${ noteText }, material status changed to ${ data.statusMtl }`
          }
          if( origQuote.mtlURL !== data.mtlURL && origQuote.mtlURL !== undefined  ) {
            noteText = `${ noteText }, material URL changed`
          }
          

          let quote = await Quote.findOneAndUpdate( 
            {_id: input._id},
            {"$set": data},
            {"new": true}
          );       
            
          // add note to quote
          let updatedQuote = await Quote.findOneAndUpdate(
            { _id: input._id },
            { $push: { notes: { noteText, noteBy } } },
            { new: true, runValidators: true }
          );
          return updatedQuote;
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
