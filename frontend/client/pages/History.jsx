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

  return <></>;
};

export default History;
