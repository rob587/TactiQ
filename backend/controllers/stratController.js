import pool from "../db";

export const getStrats = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM strats WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id],
    );

    res.json({
      success: true,
      strats: result.rows,
    });
  } catch (error) {
    console.error("ERRORE GET STRATS:", error);
    res.status(500).json({ error: error.message });
  }
};

export const rateStrat = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (rating === undefined) {
      return res.status(400).json({ error: "Rating obbligatorio" });
    }

    const result = await pool.query(
      `UPDATE strats SET rating = $1 WHERE id = $2 AND user_id = $3 RETURNING *`,
      [rating, id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Strat non trovata" });
    }

    res.json({
      success: true,
      strat: result.rows[0],
    });
  } catch (error) {
    console.error("ERRORE RATE STRAT:", error);
    res.status(500).json({ error: error.message });
  }
};
