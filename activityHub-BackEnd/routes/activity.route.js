import express from "express";
import { verifyUserToken } from "../utils/verifyUserToken";

const router = express.Router();

router.use(verifyUserToken);
