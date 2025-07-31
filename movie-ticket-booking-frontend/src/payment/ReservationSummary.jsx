import React from "react";
import Navbar from "../components/Navbar";
import MovieDetails from "../payment/MovieDetails";
import FoodAndBeverage from "../payment/FoodAndBeverage";
import PurchaseSummary from "../payment/PurchaseSummary";

export default function ReservationSummary() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6 ml-4 mt-8 text-left uppercase">
                    Reservation Summary</h2>
                <div className="px-8 py-4">
                    <MovieDetails />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <div className="lg:col-span-2">
                            <FoodAndBeverage />
                        </div>
                        <div>
                            <PurchaseSummary />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
