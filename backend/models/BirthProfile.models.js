import mongoose from "mongoose";

const { Schema } = mongoose;

const birthProfileSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    tob: {
        type: String,
        required: true
    },
    tob_unknown: {
        type: Boolean,
        default: false
    },
    birth_city: {
        type: String,
        required: true,
        trim: true
    },
    birth_country: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    timezone: {
        type: String,
        required: true  
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "PREFER NOT TO SAY"],
        required:true
    },
    is_primary: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const BirthProfile = mongoose.model("BirthProfile", birthProfileSchema);

export default BirthProfile;