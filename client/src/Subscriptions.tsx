import { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";

export interface SubscriptionProps {
  amount: string;
  app_fee?: string;
  count?: string;
  created_at: string;
  currency: string;
  id: string;
  status: string;
}

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Array<SubscriptionProps>>(
    []
  );

  useEffect(() => {
    fetch("/subscriptions", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ subscriptions }) => {
        setSubscriptions(
          subscriptions.filter(
            (subscription: SubscriptionProps) =>
              subscription.status === "active"
          )
        );
      });
  }, []);

  return (
    <div>
      <ul>
        {subscriptions.map((subscription: SubscriptionProps) => (
          <li>
            <Subscription {...subscription} key={subscription.id} />
          </li>
        ))}
      </ul>
      <Link to={{ pathname: "/product" }}> Go To Product </Link>
    </div>
  );
}

function Subscription(props: SubscriptionProps) {
  const [cancelled, setCancelled] = useState<boolean>(false);

  const cancelSubscription = async (id: string) => {
    const { success } = await fetch(`subscriptions/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setCancelled(success);
  };

  if (cancelled) {
    return <Redirect to={`/subscriptions`} />;
  }

  return (
    <div>
      id - {props.id} <br />
      Amount - {parseInt(props.amount) / 100} {props.currency} <br />
      Created At - {props.created_at} <br />
      <button onClick={() => cancelSubscription(props.id)}> Cancel </button>
    </div>
  );
}

export default withRouter(Subscriptions);
