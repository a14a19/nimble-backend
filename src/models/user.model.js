import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";
const bcryptSalt = process.env.BCRYPT_SALT;


const User = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            // required: true,
            // unique: true,
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        dob: {
            type: Date,
            // required: true,
        },
        locationService: {
            type: Boolean,
        },
        FoodAndDrink: [{
            type: String
        }],
        typeOfPerson: [{
            type: String,
        }],
        toFind: [{
            type: String,
        }],
        gender: {
            type: String,
            // required: true,
        },
        sexualOrientation: {
            type: String,
        },
        toBeShown: [{
            type: String,
        }],
        age: {
            type: Number,
        },
        distance: {
            type: Number,
        },
        profilePhoto: {
            type: String,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
    },
    {
        timestamps: true,
    }
);


// ! password hashing method 
User.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, Number(bcryptSalt));
}

// ! password comparing method
User.methods.validatePassword = function (password, oldPassword) {
    const result = bcrypt.compareSync(password, oldPassword);
    return result;
}

export default mongoose.model('Users', User);

// TODO

// FULL NAME -
// EMAIL ID -
// DOB -
// LOCATION SERVICE -
// MOBILE NUMBER -
// PASSION: [{"Food & Drinks"}, {"Entertainment"}, {"Sports"}, {"Travel & Activites"}, {"Pets"},]
// TYPE OF PERSON: [{"Personality": ""}, {"Astrology Sign": ""}]
// TO FIND: ""
// GENDER
// SEXUAL ORIENTATION
// TO BE SHOWN - enum
// Age
// Distance
// PROFILE PHOTO