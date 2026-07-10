import React from "react";
import { useState, useEffect } from "react";
import { getStrats } from "../services/api";

const History = () => {
  const [strats, setStrats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadStrats = async () => {
    try {
      const response = await getStrats();
      setStrats(response.data.strats);
    } catch (err) {
      console.error("Errore caricamento delle strats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStrats();
  }, []);

  const filtered = strats.filter((s) => {
    if (filter === "all") return true;
    return s.game === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        Caricamento
      </div>
    );
  }

  return <></>;
};

export default History;
