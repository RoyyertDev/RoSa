import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/users/users.html");
});

router.get("/create", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/users/create.html");
});

export default router;
