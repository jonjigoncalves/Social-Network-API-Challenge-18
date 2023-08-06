const mongoose = require('mongoose');

// Reaction subdocument schema
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Apply the getter method to format the createdAt timestamp on query
  toJSON: { getters: true }
});

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
    // Apply the getter method to format the timestamp on query
    get: (createdAt) => createdAt.toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

// Virtual to get the reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;