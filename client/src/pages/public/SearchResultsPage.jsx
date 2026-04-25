import sampleHotels from "../../data/sampleHotels";
import HotelCard from "../../components/hotel/HotelCard";

function SearchResultsPage() {
  return (
    <div className="results-page">
      <div className="results-search-bar">
        <input type="text" defaultValue="Kandy" />
        <input type="date" defaultValue="2026-05-18" />
        <select defaultValue="2 adults · 1 room">
          <option>2 adults · 1 room</option>
          <option>1 adult · 1 room</option>
          <option>Family · 2 rooms</option>
        </select>
        <button>Search</button>
      </div>

      <div className="results-layout">
        <aside className="filter-panel">
          <h3>Filter by</h3>

          <div className="filter-group">
            <h4>Price range</h4>
            <label><input type="checkbox" /> LKR 0 - 15,000</label>
            <label><input type="checkbox" /> LKR 15,000 - 25,000</label>
            <label><input type="checkbox" /> LKR 25,000+</label>
          </div>

          <div className="filter-group">
            <h4>Popular filters</h4>
            <label><input type="checkbox" /> Free Wi-Fi</label>
            <label><input type="checkbox" /> Breakfast included</label>
            <label><input type="checkbox" /> Pool</label>
            <label><input type="checkbox" /> Parking</label>
          </div>

          <div className="filter-group">
            <h4>Property type</h4>
            <label><input type="checkbox" /> Hotel</label>
            <label><input type="checkbox" /> Resort</label>
            <label><input type="checkbox" /> Guesthouse</label>
            <label><input type="checkbox" /> Villa</label>
          </div>
        </aside>

        <main className="hotel-results">
          <div className="results-header">
            <div>
              <h2>Kandy: {sampleHotels.length} stays found</h2>
              <p>Showing available hotels for your Sri Lanka trip</p>
            </div>

            <select>
              <option>Sort by Recommended</option>
              <option>Price: Low to High</option>
              <option>Rating: High to Low</option>
            </select>
          </div>

          {sampleHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default SearchResultsPage;