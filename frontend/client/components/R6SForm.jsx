import React from "react";
import { useState } from "react";
import { analyzeR6S } from "../services/api";

const MAPS = [
  "Clubhouse",
  "Bank",
  "Border",
  "Chalet",
  "Coastline",
  "Consulate",
  "Kafe",
  "Oregon",
  "Villa",
  "Skyscraper",
  "Theme Park",
  "Fortress",
  "Hereford",
  "Outback",
  "Emerald Plains",
];

const OPERATORS = [
  "Ash",
  "Thermite",
  "Thatcher",
  "Sledge",
  "Hibana",
  "Twitch",
  "Zofia",
  "Buck",
  "Montagne",
  "Lion",
  "Nomad",
  "Gridlock",
  "Flores",
  "Zero",
  "Ace",
  "Bandit",
  "Jager",
  "Rook",
  "Doc",
  "Pulse",
  "Echo",
  "Mira",
  "Lesion",
  "Ela",
  "Vigil",
  "Maestro",
  "Alibi",
  "Mozzie",
  "Warden",
  "Goyo",
];

const R6SForm = ({ onResult }) => {
  const [map, setMap] = useState("");
  const [side, setSide] = useState("attacco");
  const [selectedOps, setSelectedOps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleOperator = (op) => {
    if (selectedOps.includes(op)) {
      setSelectedOps(selectedOps.filter((o) => o !== op));
    } else if (selectedOps.length < 5) {
      setSelectedOps([...selectedOps, op]);
    }
  };

  const handleSubmit = async () => {
    if (!map) {
      setError("Seleziona una mappa");
      return;
    }
    if (selectedOps.length === 0) {
      setError("Seleziona almeno un operatore");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await analyzeR6S({
        map,
        side,
        operators: selectedOps,
      });
      onResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Errore durante l'analisi");
    } finally {
      setLoading(false);
    }
  };

  return <></>;
};

export default R6SForm;
