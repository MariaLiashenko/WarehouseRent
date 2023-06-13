import express from "express";
import { createDevice } from "../controllers/device.js";

const router = express.Router();
// create
router.post("/:warehouseId", createDevice);

export default router;
