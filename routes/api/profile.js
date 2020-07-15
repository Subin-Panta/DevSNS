const express = require('express')
const request = require('request')
const config = require('config')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
//@route GET api/profile/me
//@desc Get current users profile
//@acess Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar'])
    if (!profile) {
      return res.status(400).json({ msg: 'There is no Profile for this user' })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
//@route Post api/profile/
//@desc Create or update a user profile
//@acess Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is Required').not().isEmpty(),
      check('skills', 'skills is Required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram
    } = req.body

    //Build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    //Build Social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }
      //Create profile
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server Error')
    }
  }
)
//@route GET api/profile/
//@desc Get all Profiles
//@acess Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
  }
})

//@route GET api/profile/user/:user_id
//@desc Get Profiles by user Id
//@acess Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])
    if (!profile) return res.status(400).json({ msg: 'Profile Not Found' })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectID') {
      return res.status(400).json({ msg: 'Profile Not Found' })
    }
    res.status(500).send('Server Error')
  }
})
//@route Delete api/profile/
//@desc Delete Profile,user and posts
//@acess Private
router.delete('/', auth, async (req, res) => {
  try {
    //@todo-remove users posts
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id })
    //Remove User
    await User.findOneAndDelete({ _id: req.user.id })
    res.json({ msg: 'User Deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
//@route PUT api/profile/experience
//@desc ADD Profile experience
//@acess Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is Required').not().isEmpty(),
      check('company', 'company is Required').not().isEmpty(),
      check('from', 'From date is Required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)
//@route DELETE api/profile/experience/:exp_id
//@desc Delete Profile experience
//@acess Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    //Get the Remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
//@route PUT api/profile/education
//@desc ADD Profile education
//@acess Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is Required').not().isEmpty(),
      check('degree', 'Degree is Required').not().isEmpty(),
      check('fieldofstudy', 'Field Of Study is Required').not().isEmpty(),
      check('from', 'From Date is Required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.education.unshift(newEdu)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)
//@route Delete api/profile/education/:edu_id
//@desc Delete Profile education
//@acess Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)
    profile.education.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
//@route Get api/profile/github/:username
//@desc Get userRepos from Github
//@acess Public
router.get('/github/:username', async (req, res) => {
  try {
    cid = config.get('githubClientId')
    cs = config.get('githubSecret')
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
        client_id: cid,
        client_secret: cs
      }
    }
    request(options, (error, response, body) => {
      if (error) console.error(error)
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No github Profile Found' })
      }
      res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
module.exports = router
