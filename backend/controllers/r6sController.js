import pool from "../db.js";
import { generateR6SStrat } from "../services/aiService.js";

export const analyzeR6S = async (req, res) => {
  try {
    const { map, side, operators } = req.body;

    if (!map || !side || !operators) {
      return res
        .status(400)
        .json({ error: "Mappa, lato e operatori sono obbligatori" });
    }

    const aiResponse = await generateR6SStrat(map, side, operators);

    const result = await pool.query(
      `INSERT INTO strats (user_id, game, input_data, ai_response)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        req.user.id,
        "r6s",
        JSON.stringify({ map, side, operators }),
        aiResponse,
      ],
    );

    res.json({
      success: true,
      strat: result.rows[0],
      aiResponse,
    });
  } catch (error) {
    console.error("ERRORE R6S:", error);
    res.status(500).json({ error: error.message });
  }
};
