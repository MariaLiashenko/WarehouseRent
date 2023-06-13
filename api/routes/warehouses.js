import express from "express";
import {
    countByCity,
    createWarehouse,
    deleteWarehouse,
    getWarehouse,
    getWarehouses,
    updateWarehouse,
} from "../controllers/warehouse.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
// create
router.post("/", verifyAdmin, createWarehouse);
// update
router.put("/:id", verifyAdmin, updateWarehouse);
// delete
router.delete("/:id", verifyAdmin, deleteWarehouse);
// get one
router.get("/find/:id", getWarehouse);
// get all
router.get("/", getWarehouses);

router.get("/countByCity", countByCity);
export default router;
