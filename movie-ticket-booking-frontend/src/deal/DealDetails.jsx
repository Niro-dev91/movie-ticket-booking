import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DealDetails() {
    const { id } = useParams();
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/deals/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch deal");
                return res.json();
            })
            .then(data => {
                setDeal(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Deal not found");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="text-center py-20 text-xl">Loading deal...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="text-center py-20 text-xl">{error}</div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-6 ml-4 mt-8">{deal.title}</h1>
                <img
                    src={deal.bannerUrl}
                    alt={deal.title}
                    className="w-full rounded-lg mb-6 object-cover"
                    style={{ maxHeight: "500px" }}
                />
                <p className="text-lg mb-4">{deal.description}</p>
                {deal.terms && deal.terms.length > 0 ? (


                    <div className="space-y-2 text-gray-700">
                        {deal.terms.map((line, idx) => (
                            <p key={idx}>{line}</p>
                        ))}
                    </div>

                ) : (
                    <p className="text-gray-500">No terms available.</p>
                )}
            </div>
        </>
    );
}
