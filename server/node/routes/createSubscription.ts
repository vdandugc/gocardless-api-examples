import express from "express";
import { body, matchedData } from "express-validator";
import gocardlessClient from "../gocardlessClient";

const router = express.Router();

router.post(
  "/subscriptions",
  body("amount").not().isEmpty(),
  async (req, res) => {
    try {
      const mandate = req.cookies["customer.mandate"] as string;

      const data = matchedData(req);
      const { amount } = data;

      // create subscription
      const subscription = await gocardlessClient.subscriptions.create(
        {
          amount,
          currency: "GBP",
          name: "Monthly Subscription",
          links: {
            mandate: mandate,
          },
          interval: "1",
          interval_unit: "monthly",
          day_of_month: "5",
        },
        `subscription_${req.cookies["customer"]}_${Date.now()}`
      );

      res.send({ subscription });
    } catch (error) {
      res.status(400).send({ success: false });
    }
  }
);

export { router as createSubscriptionRouter };
