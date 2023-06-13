import Device from "../models/Device.js";

export const createDevice = async (req, res, next) => {
    try {
        console.log(req.params.warehouseId);
        const device = new Device({
            nameDevice: req.body.nameDevice,
            warehouse: req.params.warehouseId,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
        });
        await device.save();
        // res.status(200).send("Device created");
        res.status(200).json(device);
    } catch (err) {
        next(err);
    }
};
