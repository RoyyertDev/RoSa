import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/users/users.html");
});

export default router;
