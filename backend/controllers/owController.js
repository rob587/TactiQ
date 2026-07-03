import pool from "../db.js";
import { generateOWStrat } from "../services/aiService.js";

export const analyzeOW = async (req, res) => {
  try {
    const { ourComp, enemyComp } = req.body;

    if (!ourComp || !enemyComp) {
      return res
        .status(400)
        .json({ error: "Composizione tua e nemica sono obbligatorie" });
    }

    const aiResponse = await generateOWStrat(ourComp, enemyComp);

    const result = await pool.query(
      `INSERT INTO strats (user_id, game, input_data, ai_response)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.id, "ow", JSON.stringify({ ourComp, enemyComp }), aiResponse],
    );

    res.json({
      success: true,
      strat: result.rows[0],
      aiResponse,
    });
  } catch (error) {
    console.error("ERRORE OW:", error);
    res.status(500).json({ error: error.message });
  }
};
