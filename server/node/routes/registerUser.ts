import express from "express";
import { body, matchedData } from "express-validator";

const router = express.Router();

router.post("/registerUser", body("email").isEmail(), async (req, res) => {
  const data = matchedData(req);
  const { email } = data;

  res.cookie("customer", email, { maxAge: 90000, httpOnly: true });

  res.send({ customer: { email } });
});

export { router as registerRouter };
