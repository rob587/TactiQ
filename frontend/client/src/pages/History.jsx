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
        Attendi Caricamento
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Storico Strat</h1>
            <div className="flex gap-2">
              {["all", "r6s", "ow"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {f === "all" ? "Tutte" : f === "r6s" ? "🎯 R6S" : "⚔️ OW"}
                </button>
              ))}
            </div>
          </div>

          {/* Strats list */}
          {filtered.length === 0 ? (
            <div className="text-center text-gray-600 py-20">
              <p className="text-5xl mb-4">{"📭"}</p>
              <p className="text-lg">Nessuna strat trovata</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((strat) => (
                <div
                  key={strat.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6"
                >
                  {/* Strat header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {strat.game === "r6s" ? "🎯" : "⚔️"}
                      </span>
                      <div>
                        <p className="font-medium text-white">
                          {strat.game === "r6s"
                            ? `${strat.input_data.map} — ${strat.input_data.side}`
                            : `${strat.input_data.ourComp?.join(", ")}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(strat.created_at).toLocaleDateString(
                            "it-IT",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Rating badge */}
                    {strat.rating === true && (
                      <span className="bg-green-900 text-green-300 text-xs px-3 py-1 rounded-full">
                        Ha Funzionato
                      </span>
                    )}
                    {strat.rating === false && (
                      <span className="bg-red-900 text-red-300 text-xs px-3 py-1 rounded-full">
                        Non ha funzionato
                      </span>
                    )}
                    {strat.rating === null && (
                      <span className="bg-gray-800 text-gray-500 text-xs px-3 py-1 rounded-full">
                        Non valutata
                      </span>
                    )}
                  </div>

                  {/* AI Response preview */}
                  <div className="bg-gray-800 rounded-lg p-4 text-gray-400 text-sm line-clamp-3">
                    {strat.ai_response}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
