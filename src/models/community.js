import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    nqme: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    slogan: {type: String},
    policies: {type: String},
    picture: {typr: String},//url for community picture
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    ]
})

export default mongoose.model("Community", communitySchema);