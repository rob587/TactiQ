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
