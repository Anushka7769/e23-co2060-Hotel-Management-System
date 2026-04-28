import { useEffect, useState } from "react";
import { fetchHotels } from "../../services/hotelApi";
import sampleHotels from "../../data/sampleHotels";
import HotelCard from "../../components/hotel/HotelCard";

function SearchResultsPage() {
  const savedSearch = JSON.parse(
    localStorage.getItem("tourismhub_search_data") || "null"
  );

  const [searchData, setSearchData] = useState({
    destination: savedSearch?.destination || "Sri Lanka",
    checkIn: savedSearch?.checkIn || "2026-05-18",
    checkOut: savedSearch?.checkOut || "2026-05-19",
    guests: savedSearch?.guests || "2",
    guestText: savedSearch?.guestText || "2 adults · 1 room",
  });

  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    price: "",
    amenities: [],
    propertyTypes: [],
    sortBy: "recommended",
  });

  function applySearchAndFilters(hotelList, searchValue, currentFilters) {
    const keyword = searchValue.trim().toLowerCase();

    let filteredHotels = [...hotelList];

    if (keyword && keyword !== "sri lanka") {
      filteredHotels = filteredHotels.filter((hotel) => {
        const searchableText = `${hotel.name} ${hotel.city} ${hotel.area} ${hotel.address}`.toLowerCase();
        return searchableText.includes(keyword);
      });
    }

    if (currentFilters.price) {
      filteredHotels = filteredHotels.filter((hotel) => {
        const price = Number(hotel.pricePerNight);

        if (currentFilters.price === "low") {
          return price <= 15000;
        }

        if (currentFilters.price === "medium") {
          return price > 15000 && price <= 25000;
        }

        if (currentFilters.price === "high") {
          return price > 25000;
        }

        return true;
      });
    }

    if (currentFilters.amenities.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        currentFilters.amenities.every((amenity) =>
          hotel.amenities?.includes(amenity)
        )
      );
    }

    if (currentFilters.propertyTypes.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        currentFilters.propertyTypes.includes(hotel.propertyType || "Hotel")
      );
    }

    if (currentFilters.sortBy === "price-low") {
      filteredHotels.sort((a, b) => Number(a.pricePerNight) - Number(b.pricePerNight));
    }

    if (currentFilters.sortBy === "price-high") {
      filteredHotels.sort((a, b) => Number(b.pricePerNight) - Number(a.pricePerNight));
    }

    if (currentFilters.sortBy === "rating-high") {
      filteredHotels.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return filteredHotels;
  }

  useEffect(() => {
    async function loadHotels() {
      try {
        const response = await fetchHotels();

        const hotelsFromApi = response.data.map((hotel, index) => {
          const fallbackHotel = sampleHotels[index] || sampleHotels[0];

          return {
            ...fallbackHotel,
            ...hotel,
            image: fallbackHotel.image,
            rating: fallbackHotel.rating,
            reviews: fallbackHotel.reviews,
            city: hotel.city || fallbackHotel.city,
            area: hotel.address || fallbackHotel.area,
            propertyType: fallbackHotel.propertyType || "Hotel",
            pricePerNight: hotel.price_per_night || fallbackHotel.pricePerNight,
            amenities: fallbackHotel.amenities,
          };
        });

        setAllHotels(hotelsFromApi);
        setHotels(applySearchAndFilters(hotelsFromApi, searchData.destination, filters));
      } catch (err) {
        setError("Could not load hotels from backend. Showing sample hotels.");
        setAllHotels(sampleHotels);
        setHotels(applySearchAndFilters(sampleHotels, searchData.destination, filters));
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, []);

  function handleSearchChange(event) {
    const { name, value } = event.target;

    if (name === "guests") {
      setSearchData((currentData) => ({
        ...currentData,
        guests: value,
        guestText: `${value} adult${Number(value) > 1 ? "s" : ""} · 1 room`,
      }));
      return;
    }

    setSearchData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSearch() {
    localStorage.setItem("tourismhub_search_data", JSON.stringify(searchData));
    localStorage.setItem("tourismhub_check_in", searchData.checkIn);
    localStorage.setItem("tourismhub_check_out", searchData.checkOut);
    localStorage.setItem("tourismhub_guests", searchData.guests);
    localStorage.setItem("tourismhub_guest_text", searchData.guestText);

    setHotels(applySearchAndFilters(allHotels, searchData.destination, filters));
  }

  function handlePriceChange(priceValue) {
    const updatedFilters = {
      ...filters,
      price: filters.price === priceValue ? "" : priceValue,
    };

    setFilters(updatedFilters);
    setHotels(applySearchAndFilters(allHotels, searchData.destination, updatedFilters));
  }

  function handleAmenityChange(amenity) {
    const amenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((item) => item !== amenity)
      : [...filters.amenities, amenity];

    const updatedFilters = {
      ...filters,
      amenities,
    };

    setFilters(updatedFilters);
    setHotels(applySearchAndFilters(allHotels, searchData.destination, updatedFilters));
  }

  function handlePropertyTypeChange(type) {
    const propertyTypes = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter((item) => item !== type)
      : [...filters.propertyTypes, type];

    const updatedFilters = {
      ...filters,
      propertyTypes,
    };

    setFilters(updatedFilters);
    setHotels(applySearchAndFilters(allHotels, searchData.destination, updatedFilters));
  }

  function handleSortChange(event) {
    const updatedFilters = {
      ...filters,
      sortBy: event.target.value,
    };

    setFilters(updatedFilters);
    setHotels(applySearchAndFilters(allHotels, searchData.destination, updatedFilters));
  }

  function clearFilters() {
    const resetFilters = {
      price: "",
      amenities: [],
      propertyTypes: [],
      sortBy: "recommended",
    };

    setFilters(resetFilters);
    setHotels(applySearchAndFilters(allHotels, searchData.destination, resetFilters));
  }

  return (
    <div className="results-page">
      <div className="results-search-bar">
        <input
          type="text"
          name="destination"
          value={searchData.destination}
          onChange={handleSearchChange}
          placeholder="Destination or hotel name"
        />

        <input
          type="date"
          name="checkIn"
          value={searchData.checkIn}
          onChange={handleSearchChange}
        />

        <input
          type="date"
          name="checkOut"
          value={searchData.checkOut}
          onChange={handleSearchChange}
        />

        <select
          name="guests"
          value={searchData.guests}
          onChange={handleSearchChange}
        >
          <option value="1">1 adult · 1 room</option>
          <option value="2">2 adults · 1 room</option>
          <option value="3">3 adults · 1 room</option>
          <option value="4">4 adults · 1 room</option>
        </select>

        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="results-layout">
        <aside className="filter-panel improved-filter-panel">
          <div className="filter-header-row">
            <h3>Filter by</h3>
            <button type="button" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <div className="filter-group">
            <h4>Price range</h4>

            <label>
              <input
                type="checkbox"
                checked={filters.price === "low"}
                onChange={() => handlePriceChange("low")}
              />
              LKR 0 - 15,000
            </label>

            <label>
              <input
                type="checkbox"
                checked={filters.price === "medium"}
                onChange={() => handlePriceChange("medium")}
              />
              LKR 15,000 - 25,000
            </label>

            <label>
              <input
                type="checkbox"
                checked={filters.price === "high"}
                onChange={() => handlePriceChange("high")}
              />
              LKR 25,000+
            </label>
          </div>

          <div className="filter-group">
            <h4>Popular filters</h4>

            {["Free Wi-Fi", "Breakfast included", "Pool", "Parking"].map(
              (amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  {amenity}
                </label>
              )
            )}
          </div>

          <div className="filter-group">
            <h4>Property type</h4>

            {["Hotel", "Resort", "Guesthouse", "Villa"].map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={filters.propertyTypes.includes(type)}
                  onChange={() => handlePropertyTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </aside>

        <main className="hotel-results">
          <div className="results-header">
            <div>
              <h2>
                {searchData.destination}: {hotels.length} stays found
              </h2>
              <p>
                Showing hotels for {searchData.guestText} from{" "}
                {searchData.checkIn} to {searchData.checkOut}
              </p>
            </div>

            <select value={filters.sortBy} onChange={handleSortChange}>
              <option value="recommended">Sort by Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
            </select>
          </div>

          {loading && <p>Loading hotels...</p>}

          {error && <p className="form-note">{error}</p>}

          {!loading && hotels.length === 0 && (
            <p className="form-note">
              No hotels found for this search. Try changing your destination or filters.
            </p>
          )}

          {!loading &&
            hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
        </main>
      </div>
    </div>
  );
}

export default SearchResultsPage;