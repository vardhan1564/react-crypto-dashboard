import axios from "axios";

const API = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000
});

// Fetch list of coins (markets)
export const fetchMarkets = (vs_currency = "usd", per_page = 50, page = 1) =>
  API.get("/coins/markets", {
    params: { vs_currency, per_page, page, price_change_percentage: "24h" }
  }).then(res => res.data);

// Search coins by query (CoinGecko search)
export const searchCoins = (query) =>
  API.get("/search", { params: { query } }).then(res => res.data.coins);

// Fetch single coin detail
export const fetchCoinDetail = (id) =>
  API.get(`/coins/${id}`, {
    params: { localization: false, tickers: false, market_data: true, community_data: false, developer_data: false, sparkline: false }
  }).then(res => res.data);

// Fetch market chart for coin id (last N days)
export const fetchCoinMarketChart = (id, vs_currency = "usd", days = 7) =>
  API.get(`/coins/${id}/market_chart`, { params: { vs_currency, days } }).then(res => res.data);
