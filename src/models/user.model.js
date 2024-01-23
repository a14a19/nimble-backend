import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";
const bcryptSalt = process.env.BCRYPT_SALT;


const User = new Schema(
    {
        userName: {
            type: String,
            trim: true,
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        number: {
            type: Number,
        },
        dob: {
            type: Date,
            required: true,
        },
        locationService: {
            type: Boolean,
        },
        Entertainment: [{
            type: String
        }],
        FoodAndDrink: [{
            type: String
        }],
        Pets: [{
            type: String
        }],
        Sports: [{
            type: String
        }],
        TravellingAndActivities: [{
            type: String
        }],
        AstrologySign: [{
            type: String,
        }],
        Personality: [{
            type: String,
        }],
        toFind: [{
            type: String,
        }],
        gender: {
            type: String,
        },
        sexualOrientation: {
            type: String,
        },
        toBeShown: [{
            type: String,
        }],
        age: [{
            type: Number,
        }],
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
        isVerified: {
            type: Boolean,
            default: false,
        }
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