import { useState } from "react";
import R6SForm from "../components/R6SForm";
import OWForm from "../components/OWForm";
import StratResult from "../components/StratResult";

const Dashboard = () => {
  const [activeGame, setActiveGame] = useState("r6s");
  const [result, setResult] = useState(null);

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Game selector */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => {
                setActiveGame("r6s");
                setResult(null);
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                activeGame === "r6s"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800"
              }`}
            >
              Rainbow Six Siege
            </button>
            <button
              onClick={() => {
                setActiveGame("ow");
                setResult(null);
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                activeGame === "ow"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800"
              }`}
            >
              Overwatch 2
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              {activeGame === "r6s" && <R6SForm onResult={setResult} />}
              {activeGame === "ow" && <OWForm onResult={setResult} />}
            </div>

            {/* Result */}
            <div>
              <StratResult result={result} game={activeGame} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
