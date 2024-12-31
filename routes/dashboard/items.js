import express from "express";

const router = express.Router();

router.get("/items", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/items.html");
});

export default router;
