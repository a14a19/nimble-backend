import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Passion = new Schema(
    {
        Entertainment: {
            "Art": {
                type: Boolean
            },
            "Beauty": {
                type: Boolean
            },
            "Dancing": {
                type: Boolean
            },
            "Filming": {
                type: Boolean
            },
            "Gaming": {
                type: Boolean
            },
            "Movies": {
                type: Boolean
            },
            "Music": {
                type: Boolean
            },
            "Photography": {
                type: Boolean
            },
            "Singing": {
                type: Boolean
            },
            "Theatre": {
                type: Boolean
            },
            "Writing": {
                type: Boolean
            }
        },
        FoodAndDrink: {
            "Alcohol": {
                type: Boolean
            },
            "Chinese": {
                type: Boolean
            },
            "Dessert": {
                type: Boolean
            },
            "Italian": {
                type: Boolean
            },
            "Japanese": {
                type: Boolean
            },
            "Mexican": {
                type: Boolean
            },
            "Seafood": {
                type: Boolean
            },
            "Spicy": {
                type: Boolean
            },
            "Tea": {
                type: Boolean
            },
            "Vegan": {
                type: Boolean
            },
            "Vegetarian": {
                type: Boolean
            }
        },
        Pets: {
            "Birds": {
                type: Boolean
            },
            "Cats": {
                type: Boolean
            },
            "Dogs": {
                type: Boolean
            },
            "Fish": {
                type: Boolean
            },
            "NoPets": {
                type: Boolean
            },
            "Reptiles": {
                type: Boolean
            }
        },
        Sports: {
            "Badminton": {
                type: Boolean
            },
            "Baseball": {
                type: Boolean
            },
            "Basketball": {
                type: Boolean
            },
            "Biking": {
                type: Boolean
            },
            "Bowling": {
                type: Boolean
            },
            "Football": {
                type: Boolean
            },
            "Lacrosse": {
                type: Boolean
            },
            "Lifting": {
                type: Boolean
            },
            "Skiing": {
                type: Boolean
            },
            "Soccer": {
                type: Boolean
            },
            "Tennis": {
                type: Boolean
            }
        },
        TravellingAndActivities: {
            "Cafe": {
                type: Boolean
            },
            "Camping": {
                type: Boolean
            },
            "Carnival": {
                type: Boolean
            },
            "Cooking": {
                type: Boolean
            },
            "Roadtrip": {
                type: Boolean
            },
            "Scuba": {
                type: Boolean
            },
            "Sightseeing": {
                type: Boolean
            },
            "SportsGame": {
                type: Boolean
            }
        }
    }
)

export const TypeOfPerson = new Schema(
    {
        AstrologySign: {
            "Aquarius": {
                type: Boolean
            },
            "Aries": {
                type: Boolean
            },
            "Cancer": {
                type: Boolean
            },
            "Capricorn": {
                type: Boolean
            },
            "Gemini": {
                type: Boolean
            },
            "Leo": {
                type: Boolean
            },
            "Libra": {
                type: Boolean
            },
            "Pisces": {
                type: Boolean
            },
            "Sagittarius": {
                type: Boolean
            },
            "Scorpio": {
                type: Boolean
            },
            "Taurus": {
                type: Boolean
            },
            "Virgo": {
                type: Boolean
            }
        },
        Personality: {
            "Academic": {
                type: Boolean
            },
            "Adventurous": {
                type: Boolean
            },
            "Ambivert": {
                type: Boolean
            },
            "AnimalLover": {
                type: Boolean
            },
            "Athletic": {
                type: Boolean
            },
            "Chili": {
                type: Boolean
            },
            "Creative": {
                type: Boolean
            },
            "Empathetic": {
                type: Boolean
            },
            "Extrovert": {
                type: Boolean
            },
            "Foodie": {
                type: Boolean
            },
            "Homebody": {
                type: Boolean
            },
            "Introvert": {
                type: Boolean
            },
            "Outdoorsy": {
                type: Boolean
            },
            "PartyAnimal": {
                type: Boolean
            },
            "Physical": {
                type: Boolean
            },
            "Reserved": {
                type: Boolean
            },
            "Romantic": {
                type: Boolean
            },
            "Smoker": {
                type: Boolean
            }
        }
    }
)



const Traits = new Schema(
    {
        passion: Passion,
        typeOfPerson: TypeOfPerson,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Traits', Traits);