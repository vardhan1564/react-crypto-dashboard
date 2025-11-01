import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/**
 * data: [{date, price}, ...]
 */
export default function Chart({ data }) {
  if (!data || data.length === 0) return <div className="muted small">No chart data</div>;

  return (
    <div style={{width:"100%",height:280,padding:12,background:"var(--card)",borderRadius:12}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={["auto","auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" dot={false} stroke="#00b38a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
