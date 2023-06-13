import Warehouse from "../models/Warehouse.js";

export const createWarehouse = async (req, res, next) => {
    const newWarehouse = new Warehouse(req.body);
    try {
        const savedWarehouse = await newWarehouse.save();
        res.status(200).json(savedWarehouse);
    } catch (err) {
        next(err);
    }
};
export const updateWarehouse = async (req, res, next) => {
    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedWarehouse);
    } catch (err) {
        next(err);
    }
};
export const deleteWarehouse = async (req, res, next) => {
    try {
        await Warehouse.findByIdAndDelete(req.params.id);
        res.status(200).json("warehouse deleted");
    } catch (err) {
        next(err);
    }
};
export const getWarehouse = async (req, res, next) => {
    try {
        let warehouse = await Warehouse.findById(req.params.id);
        res.status(200).json(warehouse);
    } catch (err) {
        next(err);
    }
};
export const getWarehouses = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    console.log(req.query);
    try {
        let warehouses = await Warehouse.find({
            ...others,
            priceMonth: { $gt: min || 1, $lt: max || 5000000 },
        }).limit(req.query.limit);
        res.status(200).json(warehouses);
    } catch (err) {
        next(err);
    }
};

// const language = i18n.language;
// console.log("my lang" + document.cookie.value)

// console.log("my llllang" + language);

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    // console.log("my cities " + cities);

    const language = req.query.lang || "en";
    // console.log("my llllang" + language);
    try {
        const list = await Promise.all(
            cities.map((city) => {
                const filter = { [`${language}.city`]: city };
                // console.log("my filter  " + filter);

                filter[language] = { $exists: true };

                const count = Warehouse.countDocuments(filter);
                return count;
            })
            // cities.map((city) => {
            //     return Warehouse.countDocuments({ city: city });
            // })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};
