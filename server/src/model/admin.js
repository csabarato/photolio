const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Statics
adminSchema.statics.findByCredentials = async function (email, password) {

    const admin = await Admin.findOne({email: email})

    if (!admin) {
        throw new Error("no_user_found")
    }
    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
        throw new Error("invalid_username_or_pass")
    }
    return admin
}


// Methods
adminSchema.methods.generateAuthToken = async function () {

    const token = jwt.sign({id: this.id.toString}, process.env.JWT_SECRET, {
        expiresIn: "2 days"
    })

    this.tokens.push({token: token})
    await this.save()

    return token
}





const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin;


