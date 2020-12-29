const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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

// @route     POST api/profile
// @desc      create or update user profile
// @access    private
router.post('/', [ auth, [
    check('status', 'Status is Required').not().isEmpty(),
    check('skills', 'Enter atleast one skill').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company){
        profileFields.company = company;
    }
    if(website){
        profileFields.website = website;
    }
    if(location){
        profileFields.location = location;
    }
    if(bio){
        profileFields.bio = bio;
    }
    if(status){
        profileFields.status = status;
    }
    if(githubusername){
        profileFields.githubusername = githubusername;
    }
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //build social media object
    profileFields.social = {};

    if(youtube){
        profileFields.social.youtube = youtube;
    }
    if(twitter){
        profileFields.social.twitter = twitter;
    }
    if(facebook){
        profileFields.social.facebook = facebook;
    }
    if(linkedin){
        profileFields.social.linkedin = linkedin;
    }
    if(instagram){
        profileFields.social.instagram = instagram;
    }


    try {
        let profile = await Profile.findOne({ user: req.user.id });
        
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

            return res.json(profile);
        }

        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route     GET api/profile
// @desc      get all profiles
// @access    public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']); //.populate() will add the name and avatar from user model to profiles
        
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});

// @route     GET api/profile/user/:user_id
// @desc      get profile by user id
// @access    public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: "Profile not found" });
        }
        
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(400).json({ msg: "Profile not found" });
        }
        res.status(500).send('server error');
    }
});

// @route     DELETE api/profile
// @desc      delete profile, user and posts
// @access    private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo- remove user posts

        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id })

        //remove user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: "user removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route     PUT api/profile/experience
// @desc      add profile experience
// @access    private
router.put('/experience', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is requires').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route     PUT api/profile/education
// @desc      add profile experience
// @access    private
router.put('/education', [ auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is requires').not().isEmpty(),
    check('fieldofstudy', 'Field of study is requires').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route     DELETE api/profile/education/:edu_id
// @desc      delete profile education
// @access    private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id); //get the experience of that id

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;