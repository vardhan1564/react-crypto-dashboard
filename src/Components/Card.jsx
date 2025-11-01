import React from "react";
import { Link } from "react-router-dom";

export default function Card({ coin, onToggleFav, isFav }) {
  const change = coin.price_change_percentage_24h;
  const changeClass = change >= 0 ? "price-up" : "price-down";

  return (
    <div className="card">
      <div className="title">
        <img src={coin.image} alt={coin.name} />
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Link to={`/coin/${coin.id}`} className="link" style={{fontWeight:700}}>{coin.name}</Link>
            <div className="muted small">({coin.symbol?.toUpperCase()})</div>
          </div>
          <div className="muted">Market Cap: ${Number(coin.market_cap).toLocaleString()}</div>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div className="price">${Number(coin.current_price).toLocaleString()}</div>
          <div className={`muted small ${changeClass}`}>{change?.toFixed(2)}% (24h)</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
          <button className="btn" onClick={() => onToggleFav(coin)}>{isFav ? "Unsave" : "Save"}</button>
          <Link to={`/coin/${coin.id}`} className="muted small">Details →</Link>
        </div>
      </div>
    </div>
  );
}
