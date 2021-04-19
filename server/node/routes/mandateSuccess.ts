import express from "express";
import { body } from "express-validator";
import gocardlessClient from "../gocardlessClient";

const router = express.Router();

router.post(
  "/mandate-success",
  body("redirectFlowId").not().isEmpty(),
  async (req, res) => {
    const { redirectFlowId } = req.body;
    try {
      // complete mandate creation
      const redirectFlow = await gocardlessClient.redirectFlows.complete(
        redirectFlowId,
        {
          session_token: req.session.id,
        }
      );
      const mandate = redirectFlow.links.mandate;
      res.cookie("customer.mandate", mandate);

      res.send({ success: true });
    } catch (error) {
      res.status(400).send({ success: false });
    }
  }
);

export { router as mandateSuccessRouter };
