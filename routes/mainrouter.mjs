import {Router} from "express";

const router = Router();
router.get("/", (req, res) => {
  res.render("index", {
    title: "Main Page Course",
  });
});

export default router;
