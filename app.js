const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8080;
const orderRoute = require("./routes/orderRoute");
const prodsRoute = require("./routes/prodsRoute");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res, next) => {
  res.render("index.ejs", {});
});

app.use("/api/orders", orderRoute);
app.use("/api/prods", prodsRoute);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
