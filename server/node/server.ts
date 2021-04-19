import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "./.env" });

if (!process.env.GOCARDLESS_ACCESS_TOKEN) {
  console.log("The .env file is not configured properly");
  console.log("");
  process.env.GOCARDLESS_ACCESS_TOKEN
    ? ""
    : console.log("Add GOCARDLESS_ACCESS_TOKEN to .env file");

  process.exit();
}

const app = express();

app.use(cors());
app.use(json());
// Use session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "abc123",
    resave: true,
    saveUninitialized: true,
  })
);
// Use cookies to simulate logged in user.
app.use(cookieParser(process.env.SESSION_SECRET));

import { registerRouter } from "./routes/registerUser";
import { createMandateRouter } from "./routes/createMandate";
import { createSubscriptionRouter } from "./routes/createSubscription";
import { cancelSubscriptionRouter } from "./routes/cancelSubscription";
import { listSubcriptionsRouter } from "./routes/listSubscriptions";
import { getMandateRotuer } from "./routes/getMandate";
import { mandateSuccessRouter } from "./routes/mandateSuccess";

app.use(registerRouter);
app.use(createMandateRouter);
app.use(createSubscriptionRouter);
app.use(cancelSubscriptionRouter);
app.use(listSubcriptionsRouter);
app.use(getMandateRotuer);
app.use(mandateSuccessRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port 4000");
});

export default app;
