const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email-Id'],
        unique: true,
        validate: [isEmail, 'Please Type Valid Email-Id'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minlength: [6, 'Password Must Be Atleast 6 Characters']
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.post('save', function (doc, next) {
    next();
})

//for Login
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password)
        if (isAuthenticated) {
            return user;
        }
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect Email')
}
const User = mongoose.model('User', UserSchema);
module.exports = User;
