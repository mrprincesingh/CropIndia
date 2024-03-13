import express from "express";
import {  getDataByYearAndState } from "../controllers/dashboardController.js";

const router = express.Router();


router.route("/crops").get(getDataByYearAndState)






export default router;
