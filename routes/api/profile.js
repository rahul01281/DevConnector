const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile/me
// @desc      get current users profile
// @access    private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: "There is no Profile for this user" });
        }
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;