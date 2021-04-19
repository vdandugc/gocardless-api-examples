import { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

function Product() {
  const [plan, setPlan] = useState<null | string>(null);
  const [amount, setAmount] = useState<null | string>(null);

  const setPlanAndAmount = (plan: string, amount: string) => {
    setPlan(plan);
    setAmount(amount);
  };

  if (plan && amount) {
    return (
      <Redirect
        to={{
          pathname: "/subscribe",
          state: { plan, amount },
        }}
      />
    );
  }

  return (
    <div>
      <h1> Select a plan </h1>
      <div>
        <div>
          <h3>Basic</h3>

          <p>£5.00 / month</p>

          <button onClick={setPlanAndAmount.bind(null, "basic", "500")}>
            Select
          </button>
        </div>

        <div>
          <h3>Premium</h3>

          <p>£15.00 / month</p>

          <button onClick={setPlanAndAmount.bind(null, "premium", "1500")}>
            Select
          </button>
        </div>
      </div>

      <Link to={{ pathname: "/subscriptions" }}>See all Subscriptions</Link>
    </div>
  );
}

export default withRouter(Product);
