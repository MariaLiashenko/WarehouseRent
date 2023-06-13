import express from "express";
import { createReservation, deleteReservations, getReservations } from "../controllers/reservation.js";

const router = express.Router();
// create
router.post("/:warehouseId", createReservation);

// get all
router.get("/", getReservations);

// delete one
router.delete("/:id", deleteReservations);

export default router;
