import { useState } from "react";
import "./Calculator.css";

const dresses = [
  { name: "Floral Summer Dress", price: 799 },
  { name: "Elegant Party Dress", price: 1499 },
  { name: "Casual Fashion Dress", price: 599 },
  { name: "Classic Evening Dress", price: 1199 },
];

export default function Calculator({ initialDress, onBack, onPlaceOrder }) {
  const [dressIndex, setDressIndex] = useState(() => {
    const index = dresses.findIndex(
      (dress) => dress.name === initialDress?.name
    );
    return index >= 0 ? String(index) : "0";
  });

  const [quantity, setQuantity] = useState(1);
  const selectedDress = dresses[Number(dressIndex)] ?? dresses[0];
  const subtotal = selectedDress.price * quantity;
  const discount = subtotal >= 2000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className="calculator">
      <h2>Dress Shopping Calculator</h2>

      <label htmlFor="dress">Select Your Dress</label>
      <select
        id="dress"
        value={dressIndex}
        onChange={(e) => setDressIndex(e.target.value)}
      >
        {dresses.map((dress, index) => (
          <option key={dress.name} value={index}>
            {dress.name} - ₹{dress.price}
          </option>
        ))}
      </select>

      <label>Quantity</label>
      <div className="quantity-control">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span>{quantity}</span>
        <button type="button" onClick={() => setQuantity((q) => q + 1)}>
          +
        </button>
      </div>

      <div className="bill">
        <p>Price per dress: ₹{selectedDress.price}</p>
        <p>Quantity: {quantity}</p>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Discount: −₹{discount.toFixed(2)}</p>
        <h3>Final Total: ₹{total.toFixed(2)}</h3>
      </div>

      <button
        type="button"
        className="reset-button"
        onClick={() => {
          setDressIndex("0");
          setQuantity(1);
        }}
      >
        Reset Calculator
      </button>

      <button
        type="button"
        className="reset-button"
        onClick={() => {
          onPlaceOrder({
            dress: selectedDress,
            quantity,
            subtotal,
            discount,
            total,
          });
        }}
        style={{ marginTop: "10px", background: "#2f9e44" }}
      >
        Place Order
      </button>

      <button
        type="button"
        className="reset-button"
        onClick={onBack}
        style={{ marginTop: "10px" }}
      >
        Back to Dress Collection
      </button>
    </div>
  );
}
