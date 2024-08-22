import { CardSet } from "@/models/CardSet";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const method = req.method;

  await mongooseConnect();

  if (method === "POST") {
    await handlePost(req, res);
  } else if (method === "GET") {
    await handleGet(req, res);
  } else if (method === "PUT") {
    await handlePut(req, res);
  } else if (method === "DELETE") {
    await handleDelete(req, res);
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}

async function handlePost(req, res) {
  const { name, category, cards, countCards, userId, ratings, IsPublic } = req.body;

  try {
    const newCard = await CardSet.create({
      name,
      category,
      cards,
      countCards,
      userId,
      ratings,
      IsPublic,
    });

    res.status(201).json({ success: true, data: newCard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function handleGet(req, res) {
  const { cardSetId } = req.query;

  try {
    const cardSet = await CardSet.findById(cardSetId);

    if (!cardSet) {
      return res
        .status(404)
        .json({ success: false, message: "CardSet not found" });
    }

    res.status(200).json({ success: true, data: cardSet });
  } catch (error) {
    console.error("Error fetching CardSet:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function handlePut(req, res) {
  const { _id, name, category, cards, countCards, IsPublic, ratings } = req.body;

  try {
    const cardSet = await CardSet.findById(_id);
    if (!cardSet) {
      return res.status(404).json({ success: false, message: "CardSet not found" });
    }

    // Update fields
    if (name) cardSet.name = name;
    if (category) cardSet.category = category;
    if (cards) cardSet.cards = cards;
    if (countCards !== undefined) cardSet.countCards = countCards;
    if (IsPublic !== undefined) cardSet.IsPublic = IsPublic;
    if (ratings) cardSet.ratings = ratings;

    // Save the document to trigger the pre-save hook
    await cardSet.save();

    res.status(200).json({ success: true, data: cardSet });
  } catch (error) {
    console.error("Error updating CardSet data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


async function handleDelete(req, res) {
  const { cardSetId } = req.body;

  try {
    const deletedCardSet = await CardSet.findByIdAndDelete(cardSetId);

    if (!deletedCardSet) {
      return res
        .status(404)
        .json({ success: false, message: "CardSet not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "CardSet deleted successfully" });
  } catch (error) {
    console.error("Error deleting CardSet:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
