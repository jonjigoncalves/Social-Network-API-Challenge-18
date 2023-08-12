const mongoose = require('mongoose');
// import reation model, 
const Reaction = require('./Reaction'); 

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAt => createdAt.toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  // Use the Reaction schema 
  reactions: [Reaction.schema] 
});

//use the virtual method for the reationCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
