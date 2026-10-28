import "./DressStore.css";

const dresses = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 799,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
  },
  {
    id: 2,
    name: "Elegant Party Dress",
    price: 1499,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
  },
  {
    id: 3,
    name: "Casual Fashion Dress",
    price: 599,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
  },
  {
    id: 4,
    name: "Classic Evening Dress",
    price: 1199,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
  },
];

export default function DressStore({ onCalculate }) {
  return (
    <section className="dress-store">
      <h2>Our Dress Collection</h2>
      <p className="store-subtitle">
        Discover your style with our latest collection.
      </p>

      <div className="dress-grid">
        {dresses.map((dress) => (
          <article className="dress-card" key={dress.id}>
            <img src={dress.image} alt={dress.name} />

            <div className="dress-info">
              <h3>{dress.name}</h3>
              <p className="dress-price">₹{dress.price}</p>

              <button type="button" onClick={() => onCalculate(dress)}>
                Calculate Price
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
