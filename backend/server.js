// main.js
import express from "express";
import cors from "cors";

import crops from "./route/indiancropRoute.js"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.setMaxListeners(15);

app.use("/api/indiancrop" , crops)




const PORT =  3005;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


