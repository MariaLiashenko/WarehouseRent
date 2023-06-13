import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({
    en: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        adress: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    },
    ukr: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        adress: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    },
    electricity: {
        type: Boolean,
        required: true,
    },
    plumbing: {
        type: Boolean,
        required: true,
    },
    protection: {
        type: Boolean,
        required: true,
    },
    priceMonth: {
        type: Number,
        required: true,
    },
    priceYear: {
        type: Number,
        required: true,
    },
    photos: {
        type: [String],
    },
    temperature: {
        type: Number,
        min: 0,
        max: 40,
        default: 20,
    },
    humidity: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
    },
});
export default mongoose.model("Warehouse", WarehouseSchema);
