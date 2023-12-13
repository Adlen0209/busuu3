import express from "express";
import {renderHomePage} from "../controllers/mainController.js";

const router = express.Router();

// HomePage

router.get("/", renderHomePage);


// Export router
export { router };