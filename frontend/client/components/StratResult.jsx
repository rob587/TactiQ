import React from "react";
import { useState } from "react";
import { rateStrat } from "../services/api";

const StratResult = ({ result, game }) => {
  const [rated, setRated] = useState(null);

  if (!result) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center h-full gap-3 text-gray-600">
        <p className="text-lg font-medium">Nessuna strat generata</p>
        <p className="text-sm text-center">
          Seleziona i parametri e clicca Genera Strat
        </p>
      </div>
    );
  }

  const handleRate = async (rating) => {
    try {
      await rateStrat(result.strat.id, rating);
      setRated(rating);
    } catch (err) {
      console.error("Errore rating:", err);
    }
  };

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            {game === "r6s" ? "Strat R6S" : "Analisi OW"}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
            {game === "r6s"
              ? `${result.strat.input_data.map} — ${result.strat.input_data.side}`
              : `${result.strat.input_data.ourComp?.length} vs ${result.strat.input_data.enemyComp?.length}`}
          </span>
        </div>

        {/* AI Response */}
        <div className="bg-gray-800 rounded-lg p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
          {result.aiResponse}
        </div>

        {/* Rating */}
        <div className="border-t border-gray-800 pt-4">
          <p className="text-sm text-gray-400 mb-3">
            Questa strat ha funzionato?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleRate(true)}
              disabled={rated !== null}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                rated === true
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-green-900 hover:text-green-300"
              }`}
            >
              Ha Funzionato!
            </button>
            <button
              onClick={() => handleRate(false)}
              disabled={rated !== null}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                rated === false
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-red-900 hover:text-red-300"
              }`}
            >
              Non ha funzionato
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StratResult;
