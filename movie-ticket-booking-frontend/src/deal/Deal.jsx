import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

export default function Deal() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/deals/all')
      .then(res => res.json())
      .then(data => {
        setDeals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch deals:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-xl">Loading deals...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 ml-4 mt-8 text-left uppercase">
          Deals and Exclusives
        </h2>

        <div style={{ padding: "50px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {deals.map((d, index) => (
            <div
              key={d.dealId}
              style={{
                display: "flex",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "60px",
                marginBottom: "50px",
                borderRadius: "14px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                width: "80%",
                maxWidth: "1100px",
              }}
            >
              <div
                style={{
                  width: "55%",
                  marginRight: index % 2 === 0 ? "40px" : "0",
                  marginLeft: index % 2 !== 0 ? "40px" : "0",
                }}
              >
                <h2 style={{ marginBottom: "15px" }}>{d.title}</h2>
                {/*  <p style={{ color: "#444", marginBottom: "20px" }}>{d.description}</p> */}
                <Link to={`/deals/${d.dealId}`} style={{ color: "#d81b60", fontWeight: 600, textDecoration: "none" }}>
                  MORE INFO →
                </Link>
              </div>

              <div>
                <img src={`${d.bannerUrl}`} alt={d.title} style={{ width: "420px", borderRadius: "10px", objectFit: "cover" }} />
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
