import { GoCardlessClient } from "gocardless-nodejs/client";
import { Environments } from "gocardless-nodejs/constants";

const currentEnv =
  process.env.CURRENT_ENV == "staging"
    ? Environments.Sandbox
    : Environments.Live;

const client = new GoCardlessClient(
  process.env.GOCARDLESS_ACCESS_TOKEN,
  currentEnv
);

export default client;
