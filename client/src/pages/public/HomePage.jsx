import { Link } from "react-router-dom";

function HomePage() {
  const categories = ["Popular", "Beach", "Cultural", "Nature", "Luxury", "Budget", "Festivals"];

  const destinations = [
    {
      name: "Colombo",
      description: "City hotels, shopping, and nightlife",
      image: "https://images.unsplash.com/photo-1575994532957-773da2f935fb?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Kandy",
      description: "Culture, lake views, and hill country",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Ella",
      description: "Mountains, waterfalls, and nature",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Galle",
      description: "Fort, beaches, and colonial history",
      image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const offers = [
    {
      title: "Save up to 20% on early bookings",
      text: "Book your Sri Lanka stay early and save more.",
    },
    {
      title: "Weekend stay offers",
      text: "Find special deals for short trips and holidays.",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Find hotels and plan your Sri Lanka trip in one place</h1>
          <p>Search by destination or hotel name. Book faster. Save time.</p>

          <div className="search-box">
            <input type="text" placeholder="Where are you going? Colombo, Kandy, Ella..." />
            <input type="date" />
            <select>
              <option>2 adults · 1 room</option>
              <option>1 adult · 1 room</option>
              <option>2 adults · 2 rooms</option>
              <option>Family · 2 rooms</option>
            </select>
            <Link to="/hotels" className="search-button">
              Search
            </Link>
          </div>
        </div>
      </section>

      <section className="category-section">
        {categories.map((category) => (
          <button key={category} className="category-chip">
            {category}
          </button>
        ))}
      </section>

      <section className="section-block">
        <div className="section-title-row">
          <h2>Popular Destinations in Sri Lanka</h2>
          <Link to="/hotels">View all</Link>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <div
              className="destination-card"
              key={destination.name}
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <div className="destination-content">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <Link to="/hotels">Explore hotels</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Exciting offers</h2>

        <div className="offer-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
              <Link to="/hotels">View deals</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;