import React from "react";
import { useState } from "react";
import { analyzeOW } from "../services/api";

const OW_HEROES = {
  Tank: [
    "Reinhardt",
    "Winston",
    "Dva",
    "Orisa",
    "Roadhog",
    "Zarya",
    "Ramattra",
    "Junker Queen",
    "Mauga",
    "Hazard",
  ],
  DPS: [
    "Tracer",
    "Soldier76",
    "Genji",
    "Hanzo",
    "Pharah",
    "Reaper",
    "Widowmaker",
    "Cassidy",
    "Ashe",
    "Sojourn",
    "Echo",
    "Venture",
  ],
  Support: [
    "Ana",
    "Lucio",
    "Mercy",
    "Moira",
    "Zenyatta",
    "Baptiste",
    "Kiriko",
    "Illari",
    "Lifeweaver",
    "Juno",
  ],
};

const OWForm = () => {
  const [ourComp, setOurComp] = useState([]);
  const [enemyComp, setEnemyComp] = useState([]);
  const [activeTeam, setActiveTeam] = useState("our");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleHero = (hero) => {
    if (activeTeam === "our") {
      if (ourComp.includes(hero)) {
        setOurComp(ourComp.filter((h) => h !== hero));
      } else if (ourComp.length < 5) {
        setOurComp([...ourComp, hero]);
      }
    } else {
      if (enemyComp.includes(hero)) {
        setEnemyComp(enemyComp.filter((h) => h !== hero));
      } else if (enemyComp.length < 5) {
        setEnemyComp([...enemyComp, hero]);
      }
    }
  };

  const isSelected = (hero) => {
    return activeTeam === "our"
      ? ourComp.includes(hero)
      : enemyComp.includes(hero);
  };

  const handleSubmit = async () => {
    if (ourComp.length === 0 || enemyComp.length === 0) {
      setError("Seleziona almeno un hero per ogni team");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await analyzeOW({ ourComp, enemyComp });
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
        <h2 className="text-xl font-bold text-white"> Overwatch 2</h2>

        {/* Team selector */}
        <div>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setActiveTeam("our")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTeam === "our"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Il nostro team ({ourComp.length}/5)
            </button>
            <button
              onClick={() => setActiveTeam("enemy")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTeam === "enemy"
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Team nemico ({enemyComp.length}/5)
            </button>
          </div>

          {/* Heroes per ruolo */}
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
            {Object.entries(OW_HEROES).map(([role, heroes]) => (
              <div key={role}>
                <p className="text-xs text-gray-500 mb-1">{role}</p>
                <div className="flex flex-wrap gap-2">
                  {heroes.map((hero) => (
                    <button
                      key={hero}
                      onClick={() => toggleHero(hero)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isSelected(hero)
                          ? activeTeam === "our"
                            ? "bg-indigo-600 text-white"
                            : "bg-red-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {hero}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recap comp */}
        <div className="flex gap-4 text-xs">
          <div className="flex-1 bg-gray-800 rounded-lg p-3">
            <p className="text-indigo-400 font-medium mb-1">Nostro team</p>
            <p className="text-gray-300">
              {ourComp.join(", ") || "Nessun hero selezionato"}
            </p>
          </div>
          <div className="flex-1 bg-gray-800 rounded-lg p-3">
            <p className="text-red-400 font-medium mb-1">Team nemico</p>
            <p className="text-gray-300">
              {enemyComp.join(", ") || "Nessun hero selezionato"}
            </p>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? "⏳ Analizzando comp..." : "🚀 Analizza Comp"}
        </button>
      </div>
    </>
  );
};

export default OWForm;
