import express from "express";
import gocardlessClient from "../gocardlessClient";

const router = express.Router();

router.get("/subscriptions", async (req, res) => {
  try {
    // all though many mandates are possible, this demo creates subscriptions with only one demo
    const mandate = req.cookies["customer.mandate"];
    if (!mandate) {
      return res.send({ subscriptions: [] });
    }

    const subscriptions = await gocardlessClient.subscriptions.list({
      mandate,
    });
    res.send(subscriptions);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

export { router as listSubcriptionsRouter };
