import Reservation from "../models/Reservation.js";
import Warehouse from "../models/Warehouse.js";
import moment from "moment";
import jwt from "jsonwebtoken";

export const createReservation = async (req, res, next) => {
    try {
        async function isAvailable() {
            const existingReservation = await Reservation.find({
                $or: [
                    { startDate: { $lt: req.body.endDate }, endDate: { $gt: req.body.startDate } },
                    { startDate: { $gte: req.body.startDate, $lt: req.body.endDate } },
                    { endDate: { $gt: req.body.startDate, $lte: req.body.endDate } },
                ],
                warehouse: req.params.warehouseId,
            }).lean();
            return existingReservation;
        }
        const bookingAvailable = await isAvailable();

        if (bookingAvailable.length > 0) {
            return res.status(400).json({ message: "Ці дати не доступні для бронювання" });
        }
        console.log("bookingAvailable" + bookingAvailable);

        const reservation = new Reservation({
            // user: req.user.id,
            user: req.body.user,
            warehouse: req.params.warehouseId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            totalPrice: req.body.totalPrice,
        });

        // Зберегти резервацію в базі даних
        const savedReservation = await reservation.save();
        console.log(savedReservation);

        // return reservation;
        res.status(200).json(savedReservation);
    } catch (err) {
        next(err);
    }
};
export const getReservations = async (req, res, next) => {
    try {
        let reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        next(err);
    }
};
export const deleteReservations = async (req, res, next) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json("reservations delete");
    } catch (err) {
        next(err);
    }
};
