import express from "express";
import proxy from "express-http-proxy";
import users from "./admin/users.js";
import foods from "./admin/foods.js";
import items from "./admin/items.js";
import products from "./admin/products.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

router.use("/admin/users", users);
router.use("/admin/foods", foods);
router.use("/admin/items", items);
router.use("/admin/products", products);

router.get("/admin", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin/index.html");
});

/**
 * Peticiones API
 *
 */

router.use(
  "/api",
  proxy("http://localhost:8000", {
    changeOrigin: true,
    proxyReqPathResolver: function (req) {
      return req.url;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      const data = proxyResData.toString("utf-8");
      console.log(data);
      return data;
    },
  })
);

export { router };
