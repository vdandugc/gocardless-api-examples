import { useEffect, useState } from "react";
import { StaticContext, withRouter } from "react-router";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { SubscriptionProps } from "./Subscriptions";

type SubscribeParams = { plan: string; amount: string };

function Subscribe({
  location,
}: RouteComponentProps<{}, StaticContext, SubscribeParams>) {
  const [plan] = useState(location.state.plan);
  const [amount] = useState(location.state.amount);
  const [subscription, setSubscription] = useState<SubscriptionProps | null>(
    null
  );
  const [mandate, setMandate] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetMandate = async () => {
      fetch("/mandate", { method: "get" })
        .then((res) => res.json())
        .then(({ mandate }) => setMandate(mandate));
    };
    fetchAndSetMandate();
  }, []);

  const subscribe = async () => {
    if (mandate) {
      const { subscription } = await fetch("/subscriptions", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      }).then((res) => res.json());
      setSubscription(subscription);
    } else {
      const { redirect_url } = await fetch("/mandate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      }).then((res) => res.json());
      window.location.href = redirect_url;
    }
  };

  if (subscription) {
    return <Redirect to={{ pathname: "/subscriptions" }} />;
  }

  return (
    <div>
      Subscribe to : {plan}
      <button onClick={() => subscribe()}>Ok</button>
    </div>
  );
}

export default withRouter(Subscribe);
