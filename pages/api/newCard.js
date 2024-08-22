import { Card } from "@/models/Card";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const method = req.method;

  await mongooseConnect();

  if (method === "POST") {
    const { question, answer, image } = req.body;

    try {
      const newCard = await Card.create({
        question,
        answer,
        image,
      });
      res.status(201).json({ success: true, data: newCard });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (method === "GET") {
    const { cardId } = req.query;

    try {
      const foundedCard = await Card.findById(cardId);

      if (!foundedCard) {
        return res
          .status(404)
          .json({ success: false, message: "Card not found" });
      }

      res.status(200).json({ success: true, data: foundedCard });
    } catch (error) {
      console.error("Error fetching card:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else if (method === "PUT") {
    const { _id, question, answer, image } = req.body;

    try {
      const updatedCard = await Card.findByIdAndUpdate(
        _id,
        { question, answer, image },
        { new: true }
      );

      if (!updatedCard) {
        return res
          .status(404)
          .json({ success: false, message: "Card not found" });
      }

      res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
      console.error("Error updating card:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else if (method === "DELETE") {
    const { cardId } = req.body;

    try {
      const deletedCard = await Card.findByIdAndDelete(cardId);

      if (!deletedCard) {
        return res
          .status(404)
          .json({ success: false, message: "Card not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
      console.error("Error deleting card:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
