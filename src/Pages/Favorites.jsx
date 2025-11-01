import React, { useEffect, useState } from "react";
import Card from "../Components/Card"


export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFav = (coin) => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = saved.find(c => c.id === coin.id);
    const updated = exists ? saved.filter(c => c.id !== coin.id) : [coin, ...saved];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div>
      <h2 style={{marginTop:0}}>Your Favorites</h2>
      {favorites.length === 0 ? (
        <div className="empty card">You have no saved favorites yet. Save coins from the home page.</div>
      ) : (
        <div className="grid">
          {favorites.map(c => <Card key={c.id} coin={c} onToggleFav={toggleFav} isFav />)}
        </div>
      )}
    </div>
  );
}
