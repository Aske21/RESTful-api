import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Questions Controller";

const getAllQuestions = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Questions");

  return res.status(200).json({
    message: "pong",
  });
};

export default { getAllQuestions };
