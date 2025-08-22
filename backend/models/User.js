const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    dobDay: {
        type: Number,
        required: true
    },
     dobMonth: {
        type: String,
        required: true
    },
     dobYear: {
        type: Number,
        required: true
    },
    interest: {
        type: String,
        enum: ['womenwear', 'menwear', 'unisex'],
        required: true
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
},
{
    timestamps: true
}
)

userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next()
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)