import { Schema, model, models } from "mongoose";

const cardSetSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ratings: [{ type: Number }],
    rating: { type: Number, default: 0 },
    countCards: { type: Number, default: 0 },
    IsPublic: { type: Boolean, default: false },
});

cardSetSchema.pre('save', function(next) {
    if (this.ratings.length === 0) {
        this.rating = 0;
    } else {
        const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
        this.rating = sum / this.ratings.length;
    }
    next();
});

const CardSet = models.CardSet || model("CardSet", cardSetSchema);

export { CardSet };
