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

  return <div></div>;
};

export default OWForm;
