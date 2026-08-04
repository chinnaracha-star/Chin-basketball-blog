import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    data: {
      name: "john",
      age: 20,
    },
  });
});

export default router;
