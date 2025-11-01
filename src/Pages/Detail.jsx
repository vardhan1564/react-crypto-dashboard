import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetail, fetchCoinMarketChart } from "../api";
import Loader from "../Components/Loader"
import Chart from "../Components/Chart"


export default function Detail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const [detail, chartRaw] = await Promise.all([
          fetchCoinDetail(id),
          fetchCoinMarketChart(id, "usd", days)
        ]);
        if (!mounted) return;
        setCoin(detail);
        // chartRaw.prices is [ [timestamp, price], ... ]
        const mapped = chartRaw.prices.map(p => ({
          date: new Date(p[0]).toLocaleDateString(),
          price: Number(p[1].toFixed(4))
        }));
        setChartData(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id, days]);

  if (loading) return <Loader />;

  if (!coin) return <div className="empty card">Coin not found.</div>;

  const market = coin.market_data || {};

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
        <img src={coin.image?.thumb} alt={coin.name} style={{width:48,height:48}} />
        <div>
          <h2 style={{margin:0}}>{coin.name} <span className="muted small">({coin.symbol?.toUpperCase()})</span></h2>
          <div className="muted small">Rank #{coin.coingecko_rank ?? "-"}</div>
        </div>
      </div>

      <div className="detail-grid">
        <div>
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div className="muted small">Current Price</div>
                <div className="price">${market.current_price?.usd ? market.current_price.usd.toLocaleString() : "N/A"}</div>
                <div className="muted small">24h Change: {market.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%</div>
              </div>
              <div className="muted small">
                Market Cap: ${market.market_cap?.usd ? Number(market.market_cap.usd).toLocaleString() : "N/A"}
                <br />
                Circulating: {market.circulating_supply ? Number(market.circulating_supply).toLocaleString() : "N/A"}
              </div>
            </div>
          </div>

          <div style={{marginTop:12}} className="card">
            <h3 style={{marginTop:0}}>About</h3>
            <div className="muted small" dangerouslySetInnerHTML={{__html: coin.description?.en?.split(". ").slice(0,3).join(". ") + "."}} />
            <div style={{marginTop:12}}>
              <a href={coin.links?.homepage?.[0]} target="_blank" rel="noreferrer" className="link">Official site</a>
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div className="muted small">Price Chart</div>
              <div>
                <select value={days} onChange={e => setDays(Number(e.target.value))} style={{borderRadius:8,padding:6}}>
                  <option value={1}>1d</option>
                  <option value={7}>7d</option>
                  <option value={30}>30d</option>
                  <option value={90}>90d</option>
                  <option value={365}>1y</option>
                </select>
              </div>
            </div>

            <div style={{marginTop:12}}>
              <Chart data={chartData} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
