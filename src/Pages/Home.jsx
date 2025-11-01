import React, { useEffect, useState } from "react";
import { fetchMarkets, searchCoins } from "../api";
import Loader from "../Components/Loader";
import SearchBar from "../Components/SearchBar";
import Card from "../Components/Card"


export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryMode, setQueryMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { return [];}
  });

  useEffect(() => {
    loadMarkets();
  }, []);

  const loadMarkets = async () => {
    setLoading(true);
    try {
      const data = await fetchMarkets("usd", 36, 1);
      setCoins(data);
      setQueryMode(false);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleSearch = async (q) => {
    if (!q) { loadMarkets(); return; }
    setLoading(true);
    try {
      const results = await searchCoins(q);
      // searchCoins returns coins with limited fields; map to shape like markets for UI
      const mapped = results.map(c => ({
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        image: c.thumb || c.large,
        current_price: null,
        market_cap: null,
        price_change_percentage_24h: null
      }));
      setCoins(mapped);
      setQueryMode(true);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const toggleFav = (coin) => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = saved.find(c => c.id === coin.id);
    let updated;
    if (exists) {
      updated = saved.filter(c => c.id !== coin.id);
    } else {
      updated = [coin, ...saved];
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const isFav = (id) => favorites.some(f => f.id === id);

  return (
    <div>
      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <button className="btn" onClick={loadMarkets}>Refresh</button>
      </div>

      {loading ? <Loader /> : (
        <>
          {coins.length === 0 ? (
            <div className="empty card">No results found.</div>
          ) : (
            <div className="grid">
              {coins.map(c => (
                <Card key={c.id} coin={c} onToggleFav={toggleFav} isFav={isFav(c.id)} />
              ))}
            </div>
          )}
          {queryMode && <div style={{marginTop:12}} className="muted small">Search results (limited data). Click a coin for details & full market data.</div>}
        </>
      )}
    </div>
  );
}
