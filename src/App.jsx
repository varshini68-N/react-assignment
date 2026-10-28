import { useState } from "react";
import "./App.css";
import Calculator from "./Calculator";
import DressStore from "./DressStore";

export default function App() {
  const [page, setPage] = useState("login");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [selectedDress, setSelectedDress] = useState(null);
  const [order, setOrder] = useState(null);

  function clearShoppingState() {
    setSelectedDress(null);
    setOrder(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (page === "register") {
      const name = form.name.value.trim();
      const confirmPassword = form.confirmPassword.value;

      if (!name) {
        setMessage("Please enter your full name.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Passwords do not match!");
        return;
      }

      setUser({ name, email, password });
      clearShoppingState();
      setMessage("Registration successful! Please log in.");
      setPage("login");
      return;
    }

    if (user && user.email === email && user.password === password) {
      clearShoppingState();
      setMessage("");
      setPage("shop");
      return;
    }

    setMessage("Please register first or check your login details.");
  }

  if (page === "shop") {
    return (
      <div className="app">
        <header className="header">
          <h1>Elegance</h1>
          <p>Find Your Perfect Style</p>
          <button
            type="button"
            onClick={() => {
              setPage("login");
              setMessage("");
              clearShoppingState();
            }}
          >
            Logout
          </button>
        </header>

        <main className="shop-page">
          <DressStore
            onCalculate={(dress) => {
              setSelectedDress(dress);
              setPage("calculator");
            }}
          />
        </main>
      </div>
    );
  }

  if (page === "calculator") {
    return (
      <div className="app">
        <header className="header">
          <h1>Elegance</h1>
          <p>Dress Price Calculator</p>
        </header>

        <main className="auth-card">
          <Calculator
            initialDress={selectedDress}
            onBack={() => {
              setPage("shop");
              setSelectedDress(null);
            }}
            onPlaceOrder={(newOrder) => {
              setOrder(newOrder);
              setPage("order");
            }}
          />
        </main>
      </div>
    );
  }

  if (page === "order") {
    return (
      <div className="app">
        <header className="header">
          <h1>Elegance</h1>
          <p>Order Confirmation</p>
        </header>

        <main className="auth-card order-card">
          <div className="order-check" aria-hidden="true">✓</div>
          <h2>Order placed successfully!</h2>
          <p className="subtitle">
            Thank you{user?.name ? `, ${user.name}` : ""}. Your order has been
            confirmed.
          </p>

          {order && (
            <div className="bill order-summary">
              <h3>Order Summary</h3>
              <p>Dress: {order.dress.name}</p>
              <p>Price per dress: ₹{order.dress.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Subtotal: ₹{order.subtotal.toFixed(2)}</p>
              <p>Discount: −₹{order.discount.toFixed(2)}</p>
              <h3>Amount paid: ₹{order.total.toFixed(2)}</h3>
            </div>
          )}

          <button
            className="order-action"
            type="button"
            onClick={() => {
              clearShoppingState();
              setPage("shop");
            }}
          >
            Continue Shopping
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Elegance</h1>
        <p>Find Your Perfect Style</p>
      </header>

      <main className="auth-card">
        <h2>{page === "login" ? "Welcome Back" : "Create Account"}</h2>

        <p className="subtitle">
          {page === "login"
            ? "Login to explore our latest collection"
            : "Join us and discover your style"}
        </p>

        <form onSubmit={handleSubmit}>
          {page === "register" && (
            <>
              <input name="name" type="text" placeholder="Full Name" required />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </>
          )}

          <input name="email" type="email" placeholder="Email Address" required />
          <input
            name="password"
            type="password"
            placeholder="Password (minimum 6 characters)"
            minLength={6}
            required
          />

          <button type="submit">
            {page === "login" ? "Login" : "Register"}
          </button>
        </form>

        {message && <p className="subtitle">{message}</p>}

        <p className="switch">
          {page === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            className="link-button"
            type="button"
            onClick={() => {
              setPage(page === "login" ? "register" : "login");
              setMessage("");
              clearShoppingState();
            }}
          >
            {page === "login" ? "Register" : "Login"}
          </button>
        </p>
      </main>
    </div>
  );
}
