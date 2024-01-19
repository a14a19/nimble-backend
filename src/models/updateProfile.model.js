import mongoose from 'mongoose';
import { Passion, TypeOfPerson } from './traits.model.js';
const Schema = mongoose.Schema;

const UpdateProfile = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            default: "",
            // required: true,
            // unique: true,
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
            default: "",
        },
        number: {
            type: Number,
            required: true,
            default: 0,
        },
        dob: {
            type: Date,
            // required: true,
            default: new Date(),
        },
        locationService: {
            type: Boolean,
            default: false,
        },
        toFind: [{
            type: String,
        }],
        gender: {
            type: String,
            // required: true,
            default: "",
        },
        sexualOrientation: {
            type: String,
            default: "",
        },
        toBeShown: [{
            type: String,
        }],
        age: {
            type: Number,
            default: 18,
        },
        distance: {
            type: Number,
            default: 5,
        },
        profilePhoto: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
            default: "",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        passion: Passion,
        typeOfPerson: TypeOfPerson,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('UpdateProfile', UpdateProfile);

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