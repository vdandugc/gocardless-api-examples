import { useEffect, useState } from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import QueryString from "query-string";

function MandateSuccess(props: RouteComponentProps) {
  const [mandateSuccess, setMandateSuccess] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<object | null>(null);
  const params = QueryString.parse(props.location.search);
  const redirectFlowId = params.redirect_flow_id;
  const amount = params.amount;

  useEffect(() => {
    const makeSubscription = async () => {
      const { success } = await fetch("/mandate-success", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redirectFlowId,
        }),
      }).then((res) => res.json());
      setMandateSuccess(success);

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
    };

    makeSubscription();
  }, []);

  if (subscription && mandateSuccess) {
    return <Redirect to={{ pathname: "/subscriptions" }} />;
  }

  return <div></div>;
}

export default withRouter(MandateSuccess);
