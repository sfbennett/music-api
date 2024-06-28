import express from "express";
import "dotenv/config";
import cors from "cors";
import albumRoutes from "./src/routes/albums.js";
import artistRoutes from "./src/routes/artists.js";

const port = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "Hello, world! This is a RESTful music API built using Express and connected to a PostgreSQL database hosted on SupaBase."
  );
});

const musicRouter = express.Router();
musicRouter.use("/albums", albumRoutes);
musicRouter.use("/artists", artistRoutes);
app.use(musicRouter);

app.listen(port, () => {
  console.log(`Listening on post: http://localhost:${port}.`);
});
