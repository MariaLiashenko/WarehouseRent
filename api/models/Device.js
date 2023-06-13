import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema(
    {
        nameDevice: {
            type: String,
            required: true,
        },
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "warehouse",
        },
        temperature: {
            type: String,
            min: 0,
            max: 80,
            default: 20,
        },
        humidity: {
            type: String,
            min: 0,
            max: 100,
            default: 50,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Device", DeviceSchema);
