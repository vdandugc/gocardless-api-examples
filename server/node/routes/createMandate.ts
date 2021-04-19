import express from "express";
import { body } from "express-validator";
import gocardlessClient from "../gocardlessClient";

const router = express.Router();

router.post(
  "/mandate",
  body("email").isEmail(),
  body("plan").isInt(),
  body("amount").not().isEmpty(),
  async (req, res) => {
    const email = req.cookies["customer"];
    const { amount } = req.body;
    try {
      const redirectFlow = await gocardlessClient.redirectFlows.create({
        description: "Best Coffee Shop",
        session_token: req.session.id,
        success_redirect_url: `${process.env.GOCARDLESS_MANDATE_CALLBACK_URL}?amount=${amount}`,
        prefilled_customer: {
          email,
        },
      });

      res.send({ redirect_url: redirectFlow.redirect_url });
    } catch (error) {
      res.status(400).send({ success: false });
    }
  }
);

export { router as createMandateRouter };
