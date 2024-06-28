import express from "express";
import pool from "../db.js";
const router = express.Router();

// Middleware to validate artist ID and check artist exists in the database (so route handlers don't have to repeat this step)
router.param("artistId", async (req, res, next, artistId) => {
  const id = parseInt(artistId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid artist ID" });
  }
  try {
    const query = `SELECT * FROM artists WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Artist not found!" });
    }
    req.artist = rows[0];
    next();
  } catch (err) {
    console.log(`Error validating artist ID: ${err}`);
    res.status(500).json({ error: "Error validating artist ID" });
  }
});

// GET -- retrieve all artists
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from artists");
    res.json(result.rows);
  } catch (err) {
    console.log(`Error retrieving artists: ${err}`);
    res.status(500).json({ error: "Error retrieving artists" });
  }
});

// GET -- retrieve a random artist
router.get("/random-artist", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, bio, genre FROM artists ORDER BY RANDOM() LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(`Error fetching random artist: ${err}`);
    res.status(500).json({ error: "Error retrieving random artist" });
  }
});

// GET -- retrieve artist by specific artist ID
router.get("/:artistId", async (req, res) => {
  res.json(req.artist);
});

// POST -- add new artist
router.post("/", async (req, res) => {
  const { name, bio, genre } = req.body;
  let result;
  try {
    result = await pool.query(
      "INSERT INTO artists (name, bio, genre) VALUES ($1, $2, $3) returning *;",
      [name, bio, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(`Error occurred when adding artist: ${err}`);
    res.status(500).json({ error: "Error occurred when adding artist" });
  }
});

// DELETE -- remove an artist
router.delete("/artists/:artistId", async (req, res) => {
  const artistId = req.params.artistId;

  try {
    const query = `DELETE FROM artists WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [artistId]);
    res
      .status(200)
      .json({ message: "Artist successfully deleted!", artist: rows[0] });
  } catch (err) {
    console.log(`Error deleting artist: ${err}`);
    res.status(500).json({ error: "Error deleting artist" });
  }
});

export default router;
