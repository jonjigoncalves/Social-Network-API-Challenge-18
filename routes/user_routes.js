const router = require("express").Router();
const { User } = require("../models");

// Route for creating a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: "Failed to create user" });
    }
});

// Route for getting a list of all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Route for getting a user's information by their ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
});

// Route for updating a user's information by their ID
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: "Failed to update user" });
    }
});

// Route for deleting a user by their ID
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete user" });
    }
});

// Route for adding a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ error: "User or friend not found" });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ error: "Friend is already in the user's friend list" });
        }

        user.friends.push(friendId);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Failed to add friend" });
    }
});

// Route for removing a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.friends.includes(friendId)) {
            return res.status(400).json({ error: "Friend is not in the user's friend list" });
        }

        user.friends = user.friends.filter(friend => friend.toString() !== friendId);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Failed to remove friend" });
    }
});

module.exports = router;
