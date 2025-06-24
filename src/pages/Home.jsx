import React, { useState } from "react";
import ProductList from "../components/ProductList";
import VoiceSearch from "../components/VoiceSearch";

const Home = ({ onAddToCart }) => { // <-- receive the prop
  const [searchQuery, setSearchQuery] = useState("");

  const handleVoiceSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
        Welcome to AIShop
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Shop smart with voice search and AI recommendations.
      </p>

      <VoiceSearch onSearch={handleVoiceSearch} />
      <ProductList onAddToCart={onAddToCart} filter={searchQuery} /> {/* ✅ */}
    </section>
  );
};

export default Home;
