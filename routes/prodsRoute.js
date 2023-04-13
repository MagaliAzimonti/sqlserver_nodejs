const express = require("express");
const { Router } = express;
let prodsRoute = new Router();

const BDserver = require("../db/mssql.js");

prodsRoute.get("/", async (req, res, next) => {
  res.render("prods.ejs", {});
});

prodsRoute.get("/:id", async (req, res, next) => {
  try {
    let orderId = req.params.id;
    const orders = await BDserver.getOrderByProd(orderId);
    if (orderId.length > 0 && !isNaN(orderId)) {
      res.json(orders);
    } else {
      res.send({ error: "La orden realizada no existe" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = prodsRoute;
