const express = require("express");

const mongoose = require("mongoose");
const route = require("./route/routes");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://parthjohi009:parthjoshi@cluster0.v3ypesw.mongodb.net/",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log("Promise failed", err));

app.use("/api", route);
 
app.listen(3000, () => {
  console.log("Server started on port 3000");
}); 
