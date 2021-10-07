import express from "express";

import controller from "../controllers/questions";

const router = express.Router();

router.get("/questions", controller.getAllQuestions);

export = router;
