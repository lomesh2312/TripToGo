const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || 'dev_secret';
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing credentials' });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: 'User exists' });
        }

        const user = await User.create({ email, password, name });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        user ? res.json(user) : res.status(404).json({ error: 'User not found' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = { registerUser, loginUser, getMe };
