const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/signup-details', async (req, res) => {
    const {firstName, lastName, email, password, dobDay, dobMonth, dobYear, interest, newsletter} = req.body

    try{
        let user = await User.findOne({email})
        if(user) return res.status(400).json({message: 'User already exists'})

            user= new User({firstName, lastName, email, password, dobDay, dobMonth, dobYear, interest, newsletter})
            await user.save()

            const payload = {user: {id: user._id, role: user.role}}

            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '40h'}, (err, token) => {
                if(err) throw err

                res.status(201).json({
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        dobDay: user.dobDay,
                        dobMonth: user.dobMonth,
                        dobYear: user.dobYear,
                        interest: user.interest,
                        newsletter: user.newsletter,
                        role: user.role,
                    },
                    token,
                })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
    })

      router.post('/login', async (req, res) => {
        const {email, password} = req.body

        try{
            let user = await User.findOne({email})
            if(!user) return res.status(400).json({message: "Invalid Credentials"})
                const isMatch = await user.matchPassword(password)
            if(!isMatch) return res.status(400).json({message: "Invalid Credentials"})

                 const payload = {user: {id: user._id, role: user.role}}

            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '40h'}, (err, token) => {
                if(err) throw err

                res.json({
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                })
            })
        } catch (error){
            console.log(error)
            res.status(500).send("Server Error")
        }
})

router.get('/profile', protect, async (req, res) => {
    res.json(req.user)
})


module.exports = router