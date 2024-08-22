// models/Card.js
import { Schema, model } from "mongoose";

const cardSchema = new Schema({
    question: String,
    answer: String,
    image: String,
});

let Card;

try {
    Card = model("Card");
} catch (error) {
    Card = model("Card", cardSchema);
}

export { Card as Card };