import express from "express";
import gocardlessClient from "../gocardlessClient";

const router = express.Router();

router.delete("/subscriptions/:subscriptionId", async (req, res) => {
  try {
    // all though many mandates are possible, this demo creates subscriptions with only one demo
    const { subscriptionId } = req.params;
    const subscriptions = await gocardlessClient.subscriptions.cancel(
      subscriptionId,
      {}
    );
    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

export { router as cancelSubscriptionRouter };
