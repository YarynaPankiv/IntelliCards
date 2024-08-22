import { mongooseConnect } from "@/lib/mongoose";
import { Progress } from "@/models/Progress";

export default async function handle(req, res) {
    const method = req.method;

    await mongooseConnect();

    switch (method) {
        case "POST":
            return handlePost(req, res);
        case "GET":
            return handleGet(req, res);
        case "PUT":
            return handlePut(req, res);
        case "DELETE":
            return handleDelete(req, res);
        default:
            res.status(405).json({ success: false, message: "Method not supported" });
    }
}

async function handlePost(req, res) {
  const { passedCards, passingPercentage, correctCards, cardSetsId, userId } = req.body;
  try {
      const existingProgress = await Progress.findOne({ cardSetsId, userId });
      if (existingProgress) {
          return res.status(200).json({
              success: true,
              message: "Progress for this card set already exists",
              data: existingProgress,
          });
      }
      const newProgress = await Progress.create({ passedCards, passingPercentage, correctCards, cardSetsId, userId });
      res.status(201).json({ success: true, data: newProgress });
  } catch (error) {
      console.error("Error adding progress", error);
      res.status(500).json({ success: false, error: error.message });
  }
}

async function handleGet(req, res) {
    const { progressId } = req.query;
    try {
        const foundedProgress = await Progress.findById(progressId);
        if (!foundedProgress) {
            return res.status(404).json({ success: false, message: "progressId not found" });
        }
        res.status(200).json({ success: true, data: foundedProgress });
    } catch (error) {
        console.error("Error fetching foundedProgress:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

async function handlePut(req, res) {
  const { _id, passedCards, passingPercentage, correctCards, cardSetsId, userId } = req.body;
  try {
      const updatedProgress = await Progress.findByIdAndUpdate(
          _id,
          { passedCards, passingPercentage, correctCards, cardSetsId, userId },
          { new: true }
      );
      if (!updatedProgress) {
          return res.status(404).json({ success: false, message: "updatedProgress not found" });
      }
      res.status(200).json({ success: true, data: updatedProgress });
  } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
}

async function handleDelete(req, res) {
    const { progressId } = req.body;
    try {
        const deletedProgress = await Progress.findByIdAndDelete(progressId);
        if (!deletedProgress) {
            return res.status(404).json({ success: false, message: "progressId not found" });
        }
        res.status(200).json({ success: true, message: "Progress deleted successfully" });
    } catch (error) {
        console.error("Error deleting progress:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
