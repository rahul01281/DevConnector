const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route     GET api/users
// @desc      register user
// @access    public 
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Include a valid Email').isEmail(),
    check('password', "Password with 6 or more characters is required").isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    res.send("user route");
});

module.exports = router;