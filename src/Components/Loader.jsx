import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div style={{display:"flex",justifyContent:"center",padding:24}}>
      <div className="card" style={{width:260,alignItems:"center"}}>
        <div style={{fontSize:18,fontWeight:700}}>{text}</div>
        <div className="muted small" style={{marginTop:8}}>If loading takes long, check your network or API rate limits.</div>
      </div>
    </div>
  );
}
