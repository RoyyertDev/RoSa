import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  try {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          req.session.user = data.userSession;
          res
            .status(200)
            .json({ success: true, message: "Inicio de sesión exitoso" });
        } else {
          res.status(401).json({ success: false, message: data.message });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
});

router.get("/session", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ success: true, user: req.session.user });
  } else {
    res.status(200).json({ success: false });
  }
});

export default router;
