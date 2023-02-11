const Item = require(`../models/itemModel`);

exports.addItem = async (req, res, next) => {
    console.log(req.body);
    try {
        const newItem = new Item({ name: req.body.name, renter: req.body.renter });
        const response = await newItem.save();
        res.send(response)
    } catch (err) {
        console.error(err);
        res.status(404).send(err);
    }
}

exports.deleteItem = async (req, res, next) => {
    try {
        const curItem = await Item.findById(req.body.itemId);
        if (!curItem) throw new Error('No such item')
        const response = await curItem.delete();
        res.send(response);
    } catch (err) {
        res.status(404).send(err.message);
    }
}

exports.rentItem = async (req, res, next) => {
    try {
        const curItem = await Item.findById(req.body.itemId);
        if (!curItem) throw new Error('No such item')
        if (curItem.rentee !== undefined)
            throw new Error('Item already rented');
        curItem.rentee = req.body.renteeId;
        const response = await curItem.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(404).json(err.message);
    }
}

exports.removeRentee = async (req, res, next) => {
    try {
        const curItem = await Item.findById(req.body.itemId);
        if (!curItem) throw new Error('No such item')
        curItem.rentee = undefined;
        const response = await curItem.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(404).json(err.message);
    }
}