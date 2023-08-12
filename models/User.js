const mongoose = require('mongoose');

// create a model for the user that includes username, email
const userSchema = new mongoose.Schema({
  // username is required and must be unique so we avoid duplicates 
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // email is required and must be unique so we avoid duplicates, luckily there are not duplicate emails in the world.  
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Regex to make sure input is an email in the correct format(pattern)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Please Enter A Valid Email'
    }
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: { virtuals: true },
  id: false
});

// we use the virtual method to count how many friends a user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
