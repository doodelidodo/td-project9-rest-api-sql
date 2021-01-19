const express = require('express');
const router = express.Router();
const User = require('../models').User;

const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

router.get('/', authenticateUser, asyncHandler( async (req, res) => {
    const user = req.currentUser;
    res.json({
        "firstName": user.firstName,
        "lastName": user.lastName,
        "emailAddress": user.emailAddress
    });
}));

router.post('/', asyncHandler( async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));

module.exports = router;
