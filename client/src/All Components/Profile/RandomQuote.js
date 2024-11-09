import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomQuote = () => {
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        // Fetch advice when the component mounts
        axios
            .get("https://api.adviceslip.com/advice")
            .then((response) => {
                const { advice } = response.data.slip;
                setAdvice(advice); // Update advice
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); 

    return (
        <div className="app">
            <div className="card">
                <h1 className="heading">{advice}</h1>
                <button
                    className="button"
                    onClick={() => {
                        // Fetch advice on button click
                        axios
                            .get("https://api.adviceslip.com/advice")
                            .then((response) => {
                                const { advice } = response.data.slip;
                                setAdvice(advice); // Update advice
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }}
                >
                </button>
            </div>
        </div>
    );
};

export default RandomQuote;
