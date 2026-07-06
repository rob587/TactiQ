import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/r6s", r6sRouter);
app.use("/api/ow", owRouter);
app.use("/api/strats", stratsRouter);

app.listen(PORT, () => {
  console.log(`Server aperto sulla porta: ${PORT}`);
});

// importare e usare le route
