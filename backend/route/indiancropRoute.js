import express from "express";
import {  getDataByYearAndState } from "../controllers/dashboardController.js";

const router = express.Router();


router.route("/getDataByYear").get(getDataByYearAndState)
// Route for getting filtered data



export default router;
