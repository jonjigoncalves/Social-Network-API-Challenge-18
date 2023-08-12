// ** tutor assisted with this code 
//import the express router package and our models
const router = require("express").Router();
const { User, Reaction, Thought } = require("../models");

// Route to get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find();
    //   res with all the thoughts
      res.json(thoughts);
    } catch (err) {
        // catch any errors 
      res.status(500).json({ error: err.message });
    }
  });
  
  // Route to find a specific thought by search by ID
  router.get('/thoughts/:thoughtId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not in Database' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // A post route to create() a new thought
  router.post('/thoughts', async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
      const newThought = await Thought.create({ thoughtText, username, userId });
  
      const user = await User.findById(userId);
      user.thoughts.push(newThought._id);
      await user.save();
  
      res.status(201).json(newThought);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // route that lets you update thought by its id
  router.put('/thoughts/:thoughtId', async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // route that lets you delete thought by its id
  router.delete('/thoughts/:thoughtId', async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not in Database' });
      }
  
      // Remove the thought id from the users thoughts
      const user = await User.findById(deletedThought.userId);
      user.thoughts = user.thoughts.filter(thoughtId => thoughtId.toString() !== req.params.thoughtId);

      await user.save();
  
      res.json({ message: 'thought Deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // route for thought reactions
  router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const newReaction = req.body;
  
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not in Database' });
      }
  
      thought.reactions.push(newReaction);
      await thought.save();
  
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Route to remove a reaction from a thought by its ID
  router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;
       
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not in Database' });
      }
  
      thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
        await thought.save();
   
      res.json(thought);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })

module.exports = router;