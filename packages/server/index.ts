import express from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
// automatically parse json objects from the request body
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
