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

  return <div></div>;
};

export default StratResult;
