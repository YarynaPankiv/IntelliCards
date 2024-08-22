import { Schema, model } from "mongoose";

const progressSchema = new Schema({
    passedCards:Number,
    passingPercentage:Number,  
    cardSetsId: { type: Schema.Types.ObjectId, ref: "CardSet" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    correctCards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
   
});


let Progress;

try {
    Progress = model("Progress");
} catch (error) {
    Progress = model("Progress", progressSchema);
}

export { Progress as Progress };