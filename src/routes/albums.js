import express from "express";
import pool from "../db.js";
const router = express.Router();

// Middleware to validate album ID and check album exists in the DB (so route handlers don't have to repeat this step)
router.param("albumId", async (req, res, next, albumId) => {
  const id = parseInt(albumId, 10);
  // If ID is not a valid integer...
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid album ID" });
  }
  try {
    const query = `SELECT title, TO_CHAR(release_date, 'YYYY-MM-DD') as release_date, genre FROM albums WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    // If no rows are returned from the database...
    if (rows.length === 0) {
      return res.status(404).json({ error: "Album not found!" });
    }
    req.album = rows[0]; // If an album is found rows are returned (makes album data available to route handlers)
    next();
  } catch (err) {
    console.log(`Error validating album ID: ${err}`);
    res.status(500).json({ error: "Error validating album ID" });
  }
});

// GET -- retrieve all albums
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT title, TO_CHAR(release_date, 'YYYY-MM-DD') as release_date, genre FROM albums"
    );
    res.json(result.rows);
  } catch (err) {
    console.log(`Error retrieving albums: ${err}`);
    res.status(500).json({ error: "Error retrieving albums" });
  }
});

// GET -- retrieve random album
router.get("/random-album", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, TO_CHAR(release_date, 'YYYY-MM-DD') as release_date, genre FROM albums ORDER BY RANDOM() LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(`Error retrieving random album: ${err}`);
    res.status(500).json({ error: "Error retrieving random album" });
  }
});

// GET -- retrieve album by specific album ID
router.get("/:albumId", async (req, res) => {
  res.json(req.album);
});

// GET -- retrieve albums by specific artist id (e.g. try id 6 for Black Sabbath and retrieve all their albums)
router.get("/album-artists/:artistId", async (req, res) => {
  const artistId = parseInt(req.params.artistId);

  try {
    const query = `SELECT albums.id, albums.title, TO_CHAR(albums.release_date, 'YYYY-MM-DD') as release_date, albums.genre
        FROM albums 
        INNER JOIN album_artists ON albums.id = album_artists.album_id
        WHERE album_artists.artist_id = $1`;

    const { rows } = await pool.query(query, [artistId]);

    res.json(rows);
  } catch (err) {
    console.log(`Error fetching albums by artist ID: ${err}`);
    res.status(500).json({ error: "Error fetching albums" });
  }
});

// GET -- retrieve albums by genre (?)

// POST -- add new album to the database
router.post("/", async (req, res) => {
  const { title, release_date, genre } = req.body;

  let result;
  try {
    result = await pool.query(
      "INSERT INTO albums (title, release_date, genre) VALUES ($1, $2, $3) returning *;",
      [title, release_date, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(`Error occured when adding album:\n${err}`);
    res.status(500).json({ error: "Error occurred when adding album" });
    return;
  }
});

// DELETE -- remove album by ID
router.delete("/albums/:albumId", async (req, res) => {
  const albumId = req.album.albumId;

  try {
    const query = `DELETE FROM albums WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [albumId]);
    res
      .status(200)
      .json({ message: "Album successfully deleted", album: rows[0] });
  } catch (err) {
    console.log(`Error deleting album by ID: ${err}`);
    res.status(500).json({ error: "Error deleting album" });
  }
});

export default router;
