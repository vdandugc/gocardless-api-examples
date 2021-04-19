import { FormEvent, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState<string>("cale.wilms@example.com");
  const [customer, setCustomer] = useState<null | object>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { customer } = await fetch("/registerUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then((res) => res.json());

    setCustomer(customer);
  };

  if (customer) {
    return <Redirect to={{ pathname: "/product" }} />;
  }

  return (
    <main>
      <h1>Sample Coffee Shop</h1>
      <img
        src="https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320"
        alt="unsplash"
        height="160"
      />
      <p>Coffee Subscriptions. Cancel anytime.</p>

      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default withRouter(Register);
