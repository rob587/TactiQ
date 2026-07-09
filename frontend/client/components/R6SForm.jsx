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

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-5">
        <h2 className="text-xl font-bold text-white">Rainbow Six Siege</h2>

        {/* Mappa */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Mappa</label>
          <select
            value={map}
            onChange={(e) => setMap(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="">Seleziona mappa...</option>
            {MAPS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Lato */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Lato</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSide("attacco")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                side === "attacco"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Attacco
            </button>
            <button
              onClick={() => setSide("difesa")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                side === "difesa"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Difesa
            </button>
          </div>
        </div>

        {/* Operatori */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Operatori ({selectedOps.length}/5)
          </label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {R6S_OPERATORS.map((op) => (
              <button
                key={op}
                onClick={() => toggleOperator(op)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedOps.includes(op)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? "⏳ Generando strat..." : "🚀 Genera Strat"}
        </button>
      </div>
    </>
  );
};

export default R6SForm;
