import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

router.get("/dashboard", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/dashboard.html");
});

router.get("/users", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/users.html");
});

router.get("/foods", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/foods.html");
});

router.get("/items", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/items.html");
});

router.get("/products", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/products.html");
});

export { router };
