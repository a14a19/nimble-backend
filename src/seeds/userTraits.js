import { config } from "dotenv";
config();
import { connect } from "mongoose";
import Traits from "../models/traits.model.js";

(
    async () => {
        await connect(process.env.MONGO_URI)
    }
)().then(() => {
    console.log("Seed connected to DB")
}).catch((e) => {
    console.log("error in seed: ", e)
})

const createUserTraits = async () => {
    try {
        const data = {
            passion: {
                Entertainment: {
                    Art: false,
                    Beauty: false,
                    Dancing: false,
                    Filming: false,
                    Gaming: false,
                    Movies: false,
                    Music: false,
                    Photography: false,
                    Singing: false,
                    Theatre: false,
                    Writing: false
                },
                FoodAndDrink: {
                    Alcohol: false,
                    Chinese: false,
                    Dessert: false,
                    Italian: false,
                    Japanese: false,
                    Mexican: false,
                    Seafood: false,
                    Spicy: false,
                    Tea: false,
                    Vegan: false,
                    Vegetarian: false
                },
                Pets: {
                    Birds: false,
                    Cats: false,
                    Dogs: false,
                    Fish: false,
                    NoPets: false,
                    Reptiles: false
                },
                Sports: {
                    Badminton: false,
                    Baseball: false,
                    Basketball: false,
                    Biking: false,
                    Bowling: false,
                    Football: false,
                    Lacrosse: false,
                    Lifting: false,
                    Skiing: false,
                    Soccer: false,
                    Tennis: false
                },
                TravellingAndActivities: {
                    Cafe: false,
                    Camping: false,
                    Carnival: false,
                    Cooking: false,
                    Roadtrip: false,
                    Scuba: false,
                    Sightseeing: false,
                    SportsGame: false
                }
            },
            typeOfPerson: {
                "AstrologySign": {
                    "Aquarius": false,
                    "Aries": false,
                    "Cancer": false,
                    "Capricorn": false,
                    "Gemini": false,
                    "Leo": false,
                    "Libra": false,
                    "Pisces": false,
                    "Sagittarius": false,
                    "Scorpio": false,
                    "Taurus": false,
                    "Virgo": false
                },
                "Personality": {
                    "Academic": false,
                    "Adventurous": false,
                    "Ambivert": false,
                    "AnimalLover": false,
                    "Athletic": false,
                    "Chili": false,
                    "Creative": false,
                    "Empathetic": false,
                    "Extrovert": false,
                    "Foodie": false,
                    "Homebody": false,
                    "Introvert": false,
                    "Outdoorsy": false,
                    "PartyAnimal": false,
                    "Physical": false,
                    "Reserved": false,
                    "Romantic": false,
                    "Smoker": false
                }
            }
        }

        const traits = await new Traits(data).save();
        console.log("Admin create: ", traits);
    } catch (e) {
        console.log("error in create admin seed: ", e)
    }
}

await createUserTraits();