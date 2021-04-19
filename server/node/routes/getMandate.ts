import express from "express";

const router = express.Router();

router.get("/mandate", async (req, res) => {
  const mandate = req.cookies["customer.mandate"] as string;
  res.send({ mandate });
});

export { router as getMandateRotuer };
