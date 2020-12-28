const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route     GET api/users
// @desc      register user
// @access    public 
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Include a valid Email').isEmail(),
    check('password', "Password with 6 or more characters is required").isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        //see if user exists
        let user = await User.findOne({ email: email });

        if(user){
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        //get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        //encrypt the password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();  //anything that returns a promise, put await before it

        //return the json web token

        res.send("user registered");
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;